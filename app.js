const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mysql = require('mysql2/promise');
const port = process.env.PORT || 3000;

// Database connection pool
const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',            
  password: 'root', 
  database: 'malawi_tourism',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Set EJS as the view engine and set views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the directory if it doesn't exist
    const uploadPath = path.join(__dirname, 'public/images/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY createdAt DESC');
    res.render('index', {
      posts: rows,
      title: 'Malawi Tourism Blog - Discover the Beauty of Malawi'
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      message: 'Database error',
      title: 'Error - Malawi Tourism Blog'
    });
  }
});

// Redirect 
app.get('/create', (req, res) => {
  res.redirect('/posts/new');
});

// About page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us - Malawi Tourism Blog'
  });
});

// Create new post form
app.get('/posts/new', (req, res) => {
  res.render('create', {
    title: '',
    post: {}
  });
});

// View single post
app.get('/posts/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    const post = rows[0];
    if (!post) {
      return res.status(404).render('error', { 
        message: 'Post not found',
        title: 'Post Not Found - Malawi Tourism Blog'
      });
    }
    res.render('post', {
      title: `${post.title} - Malawi Tourism Blog`,
      post
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      message: 'Database error',
      title: 'Error - Malawi Tourism Blog'
    });
  }
});

// Create new post (handle form submission)
app.post('/posts', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  let image = 'default.jpg'; // Default image

  // If a file was uploaded, use its filename
  if (req.file) {
    image = 'uploads/' + req.file.filename;
  }

  // Validation
  if (!title || !content) {
    return res.status(400).render('create', {
      title: '',
      error: 'Title and content are required',
      post: { title, content }
    });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, image, content, createdAt) VALUES (?, ?, ?, NOW())',
      [title, image, content]
    );
    const newId = result.insertId;
    res.redirect(`/posts/${newId}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('create', {
      title: '',
      error: 'Database error while creating post',
      post: { title, content }
    });
  }
});

// Edit post form
app.get('/posts/:id/edit', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    const post = rows[0];
    if (!post) {
      return res.status(404).render('error', { 
        message: 'Post not found',
        title: 'Post Not Found - Malawi Tourism Blog'
      });
    }
    res.render('edit', {
      title: `Edit ${post.title} - Malawi Tourism Blog`,
      post
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      message: 'Database error',
      title: 'Error - Malawi Tourism Blog'
    });
  }
});

// Update post (handle edit form submission)
app.put('/posts/:id', upload.single('image'), async (req, res) => {
  const { title, content, removeImage } = req.body;
  
  // Validation
  if (!title || !content) {
    return res.status(400).render('edit', {
      title: 'Edit blog post - Malawi Tourism Blog',
      error: 'Title and content are required',
      post: { id: req.params.id, title, content }
    });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).render('error', { 
        message: 'Post not found',
        title: 'Post Not Found - Malawi Tourism Blog'
      });
    }

    let image = rows[0].image;
    
    // Handle image removal
    if (removeImage === 'true') {
      image = 'default.jpg';
    }
    
    // If a new file was uploaded, use its filename
    if (req.file) {
      image = 'uploads/' + req.file.filename;
    }

    await pool.query(
      'UPDATE posts SET title = ?, image = ?, content = ? WHERE id = ?',
      [title, image, content, req.params.id]
    );
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('edit', {
      title: 'Edit blog post - Malawi Tourism Blog',
      error: 'Database error while updating post',
      post: { id: req.params.id, title, content }
    });
  }
});

// Delete post
app.delete('/posts/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).render('error', { 
        message: 'Post not found',
        title: 'Post Not Found - Malawi Tourism Blog'
      });
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      message: 'Database error',
      title: 'Error - Malawi Tourism Blog'
    });
  }
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - Malawi Tourism Blog'
  });
});

// Process contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).render('contact', {
      title: 'Contact Us - Malawi Tourism Blog',
      error: 'All fields are required',
      formData: { name, email, message }
    });
  }

  // Show success message
  res.render('contact', {
    title: 'Contact Us - Malawi Tourism Blog',
    success: 'Thank you for your message! We will get back to you soon.'
  });
});

// Error handling for file uploads
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).render('create', {
        title: 'Create a new blog post - Malawi Tourism Blog',
        error: 'File size exceeds the 5MB limit.',
        post: { title: req.body.title, content: req.body.content }
      });
    }
  } else if (error) {
    return res.status(400).render('create', {
      title: 'Create a new blog post - Malawi Tourism Blog',
      error: error.message,
      post: { title: req.body.title, content: req.body.content }
    });
  }
  next();
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page not found. The requested URL was not found on this server.',
    title: 'Page Not Found - Malawi Tourism Blog'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});