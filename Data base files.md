CREATE DATABASE malawi_tourism;

USE malawi_tourism;
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) DEFAULT 'default.jpg',
  content TEXT NOT NULL,
  createdAt DATETIME NOT NULL
);

INSERT INTO posts (title, image, content, createdAt) VALUES
('Exploring wonders of Lake Malawi', 'Lake-Malawi.jpg', 'Lake Malawi, also known as Lake Nyasa in Tanzania 
and Lago Niassa in Mozambique, is an African Great Lake located between Malawi, Mozambique, and Tanzania. 
It is the third largest lake in Africa and the ninth largest in the world. The lake is approximately 580 km long and 75 km 
wide at its widest point, with a total area of about 29,600 km². The lake is famous for being home to more species of 
fish than any other lake in the world, including at least 700 species of cichlids, with many still waiting to be discovered 
and described.<br><br>For the people of Malawi, the lake is a vital resource providing food, water transport, and tourism 
opportunities. The lake\'s clear waters and sandy beaches make it a popular destination for swimming, snorkeling, sailing, 
and kayaking. In 1984, the lake was designated a UNESCO World Heritage Site for its global importance in biodiversity 
conservation. The Lake Malawi National Park, located at the southern end of the lake, protects various aquatic habitats and 
hundreds of fish species found nowhere else on Earth. Local legend tells that the lake was discovered by the renowned 
Scottish explorer David Livingstone in 1859, though it had been known to local people for centuries before European arrival. 
The Yao people called it Nyasa, meaning simply "lake."', '2024-07-15 00:00:00'),
('Mulanje Mountain', 'mount-mulanje.jpg', 'Mulanje Massif, also known as Mount Mulanje, is a large inselberg in southern 
Malawi that rises dramatically from the surrounding plains of Phalombe. At its highest point, Sapitwa Peak, it reaches 
3,002 meters (9,849 feet), making it the highest mountain in Central Africa. The massif was formed about 130 million years 
ago from a granite upwelling. Over millennia, erosion has sculpted the mountain into its current form with dramatic peaks, 
deep valleys, and high plateaus. The mountain is known for its unique microclimate, with frequent cloud cover and higher 
rainfall than the surrounding areas.<br><br>Mulanje is ecologically significant as it hosts numerous endemic species of 
plants and animals, including the Mulanje cedar (Widdringtonia whytei), Malawi\'s national tree. This slow-growing conifer 
is critically endangered due to illegal logging and fires. The mountain holds cultural significance for the local people, 
featuring prominently in local folklore. One legend tells of a powerful spirit, Napolo, who resides on the mountain and 
causes thunderstorms and landslides when displeased. Today, Mulanje is a popular destination for hiking and climbing, with 
several huts maintained by the Malawi Mountain Club providing accommodation for multiday treks. The challenging ascent to 
Sapitwa Peak offers breathtaking views of the surrounding landscape.', '2024-07-10 00:00:00'),

('Nyika Plateau', 'nyika-plateau.jpg', 'Nyika Plateau is a beautiful, high-altitude plateau located in northern Malawi, 
with a small extension in northeastern Zambia. Most of the plateau lies within Nyika National Park, Malawi\'s largest 
national park, covering an area of about 3,200 km². The name "Nyika" means "where the water comes from" in the local 
language, an appropriate name as the plateau is the source of several important rivers. The landscape is characterized 
by rolling grasslands interspersed with patches of forest, dramatic escarpments, and occasional granite outcrops. At 
elevations between 1,800 and 2,500 meters, Nyika has a cool climate unusual for Africa,with temperatures sometimes 
dropping below freezing in winter.<br><br>This unique environment supports flora and fauna not found elsewhere in Malawi, 
including orchids, proteas, and over 400 species of birds. Large mammals found on the plateau include eland, roan antelope, 
zebra, leopard, and elephant. The park is particularly known for its high density of leopards, though these elusive cats 
are rarely seen by visitors. The plateau has a rich cultural history, with evidence of human occupation dating back to the 
Stone Age. During the colonial era, the area was set aside as a forest reserve before being declared a national park in 1965.
Today, visitors to Nyika can enjoy game drives, hiking, mountain biking, and horse riding safaris. The park\'s remote 
location and unique high-altitude ecosystem offer a wilderness experience unlike any other in Africa.', '2025-08-20 00:00:00'),

('Liwonde National Park', 'liwonde-park.jpg', 'Liwonde National Park, located in southern Malawi along the upper Shire 
River, is one of the country\'s premier wildlife destinations. Established in 1973, the park covers 548 square kilometers 
of diverse habitats including floodplains, woodlands, and lagoons. The park is best known for its large populations of 
elephants and hippos, which can often be seen along the riverbanks. Other wildlife includes crocodiles, antelope species 
such as kudu and waterbuck, and over 400 species of birds. In recent years, Liwonde has been the focus of major conservation
 efforts. In 2015, African Parks assumed management of the reserve and initiated an ambitious program to restore wildlife 
 populations. This included the reintroduction of cheetahs in 2017 and lions in 2018, making Liwonde the only park in Malawi 
 where visitors can see all of Africa\'s "Big Five" (except rhino).<br><br>The Shire River, which flows along the western 
 boundary of the park, is its lifeblood. Boat safaris along the river offer excellent opportunities to view wildlife, 
 particularly hippos and crocodiles. The river is also home to rare and endangered species such as the African skimmer and 
 Nile monitor lizard. Local communities have lived around the park for generations, and conservation efforts now include 
 community outreach programs to ensure that local people benefit from tourism and conservation. These initiatives have 
 helped reduce human-wildlife conflict and poaching. Today, visitors to Liwonde can enjoy game drives, boat safaris, and 
 walking safaris, with accommodation options ranging from luxury lodges to basic campsites. The park\'s accessibility from 
 Blantyre and its diverse wildlife make it one of Malawi\'s most popular tourist destinations.', '2022-11-15 00:00:00'),

('Zomba Plateau', 'zomba-mount.jpg', 'Zomba Plateau is a striking granite massif that rises dramatically to about 1,800 
meters (6,000 feet) above the city of Zomba, the former colonial capital of Malawi. The plateau covers an area of 
approximately 130 square kilometers and offers some of the most breathtaking views in the country. The plateau was formed 
about 130 million years ago during the breakup of Gondwana, the ancient supercontinent. Over millennia, erosion has 
sculpted the granite into its current form, with dramatic cliffs, rocky outcrops, and deep valleys. Zomba\'s elevation 
creates a cool, moist climate that supports diverse vegetation, including evergreen forests, pine plantations, grasslands, 
and patches of heather. The plateau is home to various antelope species, monkeys, and over 100 species of birds. The 
plateau has several streams and rivers that originate from its heights, including the Mulunguzi, Domasi, and Likangala 
rivers. These water sources feed the surrounding agricultural lands and provide drinking water for the city below.
During the colonial era, Zomba was developed as a hill station where British officials could escape the heat of the 
lowlands. Remnants of this era include the former Governor\'s residence and various walking trails. The plateau also 
served as an important site for astronomical observations in the early 20th century.Today, Zomba Plateau is a popular 
destination for hiking, mountain biking, and horseback riding. Key attractions include Emperor\'s View, which offers 
panoramic vistas of Lake Chilwa and the Shire Highlands, and the Chagwa Falls. The plateau\'s cool climate and scenic 
beauty make it a refreshing retreat from Malawi\'s lowland heat.', '2023-05-20 00:00:00'),

('Cape Maclear', 'cape-maclear.jpg', 'Cape Maclear, known locally as Chembe, is a picturesque fishing village located on 
the southern shore of Lake Malawi within the Lake Malawi National Park. This UNESCO World Heritage Site is renowned for 
its stunning beaches, crystal-clear waters, and incredible biodiversity.The cape was named after Sir Thomas Maclear, 
Astronomer Royal at the Cape of Good Hope and friend of David Livingstone, who visited the area in 1859. Livingstone\'s 
mission established a base here, making it one of the first places in Malawi visited by Europeans.The waters around Cape 
Maclear are home to hundreds of species of colorful cichlid fish, making it a snorkeling and diving paradise. The 
aquarium-like clarity of the water allows visitors to observe these unique fish in their natural habitat without even 
getting wet.Beyond its natural beauty, Cape Maclear has a rich cultural history. The area has been inhabited by the Chewa 
people for centuries, and traditional fishing methods are still practiced today. The village offers visitors a glimpse into 
authentic Malawian life alongside tourist facilities.Nearby islands, including Thumbi West Island and Domwe Island, provide 
excellent opportunities for kayaking, hiking, and camping. The area is also known for its spectacular sunsets, which paint 
the sky and lake in brilliant shades of orange and red. Conservation efforts in the area focus on protecting the lake\'s 
unique biodiversity while supporting sustainable tourism that benefits local communities. These initiatives have helped 
maintain Cape Maclear\'s status as one of Malawi\'s premier tourist destinations.', '2023-08-10 00:00:00');