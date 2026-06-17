import { ChatbotTrainingItem } from './types';

export const chatbotTrainingData: ChatbotTrainingItem[] = [
  // Greetings
  {
    patterns: ["hello", "hi", "hey", "namaste", "greetings", "good morning", "good afternoon", "good evening"],
    responses: [
      "Namaste! 🙏 How can I help you explore India today?",
      "Hello there! Ready to discover the magic of India? Ask me anything!",
      "Namaste! 🙏 What aspect of incredible India would you like to know about?"
    ],
    category: "greetings"
  },
  
  // Additional State Capitals
  {
    patterns: [
      "capital of uttar pradesh", "uttar pradesh capital", "what is the capital of uttar pradesh",
      "lucknow", "where is lucknow"
    ],
    responses: [
      "Lucknow is the capital city of Uttar Pradesh. It's known for its architecture, cuisine, and rich cultural heritage.",
      "The capital of Uttar Pradesh is Lucknow, famous for its Nawabi era buildings, kebabs, and Chikankari embroidery."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of delhi", "delhi capital", "what is the capital of delhi",
      "new delhi", "where is new delhi"
    ],
    responses: [
      "New Delhi is the capital city of India and a part of the Delhi National Capital Territory.",
      "While Delhi is a union territory, New Delhi specifically is the capital of India and the seat of all three branches of the Government of India."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of maharashtra", "maharashtra capital", "what is the capital of maharashtra",
      "mumbai", "where is mumbai"
    ],
    responses: [
      "Mumbai is the capital city of Maharashtra. It's India's financial center and home to Bollywood, India's largest film industry.",
      "The capital of Maharashtra is Mumbai (formerly known as Bombay), which is also India's largest city and financial powerhouse."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of tamil nadu", "tamil nadu capital", "what is the capital of tamil nadu",
      "chennai", "where is chennai"
    ],
    responses: [
      "Chennai (formerly known as Madras) is the capital city of Tamil Nadu. It's known for its cultural heritage, temples, and beaches.",
      "The capital of Tamil Nadu is Chennai, a major cultural, economic and educational center in South India."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of karnataka", "karnataka capital", "what is the capital of karnataka",
      "bangalore", "bengaluru", "where is bangalore", "where is bengaluru"
    ],
    responses: [
      "Bengaluru (also known as Bangalore) is the capital city of Karnataka. It's known as India's 'Silicon Valley' due to its IT industry.",
      "The capital of Karnataka is Bengaluru, famous for its pleasant climate, parks, tech companies, and vibrant startup ecosystem."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of gujarat", "gujarat capital", "what is the capital of gujarat",
      "gandhinagar", "where is gandhinagar"
    ],
    responses: [
      "Gandhinagar is the capital city of Gujarat. Ahmedabad, the former capital, remains the largest city and commercial center of Gujarat.",
      "The capital of Gujarat is Gandhinagar, named after Mahatma Gandhi and planned by the famous architect Louis Kahn."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of west bengal", "west bengal capital", "what is the capital of west bengal",
      "kolkata", "calcutta", "where is kolkata", "where is calcutta"
    ],
    responses: [
      "Kolkata (formerly known as Calcutta) is the capital city of West Bengal. It's known for its literature, art, and colonial architecture.",
      "The capital of West Bengal is Kolkata, known as the 'Cultural Capital of India' with a rich heritage in arts, literature, and political movements."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of rajasthan", "rajasthan capital", "what is the capital of rajasthan",
      "jaipur", "where is jaipur"
    ],
    responses: [
      "Jaipur is the capital city of Rajasthan. Known as the 'Pink City', it's famous for its stunning palaces and is part of the Golden Triangle tourist circuit.",
      "The capital of Rajasthan is Jaipur, recognized for its distinctive pink-colored buildings, grand palaces like Hawa Mahal, and rich Rajput heritage."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of kerala", "kerala capital", "what is the capital of kerala",
      "thiruvananthapuram", "trivandrum", "where is thiruvananthapuram", "where is trivandrum"
    ],
    responses: [
      "Thiruvananthapuram (also known as Trivandrum) is the capital city of Kerala. It's known for its British colonial architecture and temples.",
      "The capital of Kerala is Thiruvananthapuram, featuring beautiful beaches, historic temples like Padmanabhaswamy, and lush greenery."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of andhra pradesh", "andhra pradesh capital", "what is the capital of andhra pradesh",
      "amaravati", "where is amaravati"
    ],
    responses: [
      "Amaravati is the planned capital city of Andhra Pradesh, while Hyderabad served as the joint capital until 2024. Visakhapatnam is now being developed as the new administrative capital.",
      "The capital situation of Andhra Pradesh is complex - Amaravati was planned as the capital, but currently Visakhapatnam is being developed as the administrative capital."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of telangana", "telangana capital", "what is the capital of telangana",
      "hyderabad", "where is hyderabad"
    ],
    responses: [
      "Hyderabad is the capital city of Telangana. Famous for its Charminar, biryani, and the historic Golconda Fort, it's also a major IT hub.",
      "The capital of Telangana is Hyderabad, a city known for blending traditional culture with modern technology, often called 'Cyberabad' for its tech industry."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of punjab", "punjab capital", "what is the capital of punjab",
      "chandigarh", "where is chandigarh"
    ],
    responses: [
      "Chandigarh serves as the capital of both Punjab and Haryana states. It's a planned city designed by Swiss-French architect Le Corbusier.",
      "The capital of Punjab is Chandigarh, which is a union territory and also serves as Haryana's capital. It's known for its modern architecture and urban design."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of haryana", "haryana capital", "what is the capital of haryana",
      "chandigarh", "where is chandigarh"
    ],
    responses: [
      "Chandigarh serves as the capital of both Haryana and Punjab states. It's a planned city designed by Swiss-French architect Le Corbusier.",
      "The capital of Haryana is Chandigarh, which is a union territory and also serves as Punjab's capital. It's known for its modern architecture and urban design."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of odisha", "odisha capital", "what is the capital of odisha",
      "capital of orissa", "orissa capital", "what is the capital of orissa",
      "bhubaneswar", "where is bhubaneswar"
    ],
    responses: [
      "Bhubaneswar is the capital city of Odisha (formerly known as Orissa). It's known as the 'Temple City of India' with over 700 temples.",
      "The capital of Odisha is Bhubaneswar, famous for its ancient temples, particularly the Lingaraj Temple and nearby Konark Sun Temple."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of madhya pradesh", "madhya pradesh capital", "what is the capital of madhya pradesh",
      "bhopal", "where is bhopal"
    ],
    responses: [
      "Bhopal is the capital city of Madhya Pradesh. Known as the 'City of Lakes', it features two main lakes and a mix of Hindu and Islamic architecture.",
      "The capital of Madhya Pradesh is Bhopal, which combines natural beauty with historical monuments like Taj-ul-Masajid, one of Asia's largest mosques."
    ],
    category: "geography"
  },
  {
    patterns: [
      "capital of chhattisgarh", "chhattisgarh capital", "what is the capital of chhattisgarh",
      "raipur", "where is raipur"
    ],
    responses: [
      "Raipur is the capital city of Chhattisgarh. It's a major commercial and industrial center in central India.",
      "The capital of Chhattisgarh is Raipur, known for its steel markets, handicrafts, and the nearby Barnawapara Wildlife Sanctuary."
    ],
    category: "geography"
  },
  
  // More State Information
  {
    patterns: ["tell me about kerala", "kerala information", "kerala tourism", "about kerala"],
    responses: [
      "Kerala, known as God's Own Country, is famous for its serene backwaters, lush hill stations, and ayurvedic traditions. Popular destinations include Alleppey, Munnar, and Kovalam beach.",
      "Kerala is a coastal state in southwest India, known for its palm-lined beaches, backwaters, and tea plantations. The cuisine features coconut and seafood dishes like fish curry.",
      "Kerala offers a rich cultural experience with Kathakali performances, snake boat races, and a unique blend of Hindu, Christian and Islamic influences."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about rajasthan", "rajasthan information", "rajasthan tourism", "about rajasthan"],
    responses: [
      "Rajasthan, the 'Land of Kings,' is known for its magnificent forts, colorful festivals, and vast desert. Must-visit places include Jaipur, Udaipur, Jaisalmer, and Jodhpur.",
      "Rajasthan offers a blend of royal heritage and vibrant culture. You can explore palaces, enjoy folk music and dance, shop for textiles, and taste authentic Rajasthani cuisine.",
      "Rajasthan's rich history is reflected in its architecture, cuisine, and traditions. The state is famous for its hospitality, camel safaris, and the grand Pushkar Fair."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about goa", "goa information", "goa tourism", "about goa"],
    responses: [
      "Goa, India's smallest state, is famous for its pristine beaches, vibrant nightlife, and Portuguese influence. Popular beaches include Baga, Calangute, and Palolem.",
      "Goa offers a unique blend of Indian and Portuguese cultures, reflected in its architecture, cuisine, and festivals. Don't miss the beautiful old churches, spice plantations, and seafood.",
      "Goa is perfect for beach lovers, water sports enthusiasts, and history buffs. You can enjoy paragliding, visit historic forts, or simply relax by the Arabian Sea."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about tamil nadu", "tamil nadu information", "tamil nadu tourism", "about tamil nadu"],
    responses: [
      "Tamil Nadu is known for its classical arts, Dravidian temples, and rich cultural heritage. Must-visit places include Chennai, Madurai, Pondicherry, and Ooty.",
      "Tamil Nadu's magnificent temples showcase the pinnacle of Dravidian architecture. The state is also famous for its classical music, dance, and delicious cuisine.",
      "Tamil Nadu offers diverse experiences from temple visits in Madurai and Rameshwaram to colonial heritage in Pondicherry and hill stations like Kodaikanal."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about himachal pradesh", "himachal pradesh information", "himachal tourism", "about himachal"],
    responses: [
      "Himachal Pradesh is a mountainous state in northern India famous for its scenic beauty, hill stations, and adventure sports. Popular destinations include Shimla, Manali, and Dharamshala.",
      "Himachal Pradesh offers breathtaking landscapes with snow-capped mountains, lush valleys, and glistening rivers. It's perfect for trekking, paragliding, and skiing in winter.",
      "Himachal Pradesh combines natural beauty with spiritual heritage. Visit the Dalai Lama's residence in McLeodganj, ancient temples, and experience the unique local culture and cuisine."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about gujarat", "gujarat information", "gujarat tourism", "about gujarat"],
    responses: [
      "Gujarat, the westernmost state of India, is known for its diverse landscape, rich heritage, and business environment. Major attractions include the Rann of Kutch, Gir Forest, and Sabarmati Ashram.",
      "Gujarat is the land of Mahatma Gandhi and offers vibrant cultural experiences with colorful festivals like Navratri. The state has the world's longest dance festival and unique crafts.",
      "Gujarat features incredible diversity from the white desert of Kutch to the only home of Asiatic lions at Gir. The state is also known for its vegetarian cuisine and traditional textiles."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about kashmir", "jammu and kashmir information", "kashmir tourism", "about kashmir"],
    responses: [
      "Kashmir, often called 'Paradise on Earth,' is renowned for its breathtaking beauty with snow-capped mountains, serene lakes, and verdant meadows. Key destinations include Srinagar, Gulmarg, and Pahalgam.",
      "Kashmir's stunning landscape offers year-round experiences: flower-filled gardens and lake activities in summer, brilliant autumn colors, and world-class skiing in winter.",
      "Kashmir is famous for its distinctive culture, cuisine, and crafts including Pashmina shawls, walnut wood carving, and paper-mâché art. Don't miss a stay in traditional houseboats on Dal Lake."
    ],
    category: "states"
  },
  {
    patterns: ["tell me about uttar pradesh", "uttar pradesh information", "uttar pradesh tourism", "about uttar pradesh"],
    responses: [
      "Uttar Pradesh, India's most populous state, is home to iconic landmarks like the Taj Mahal in Agra and holy cities like Varanasi on the banks of the Ganges River.",
      "Uttar Pradesh holds immense religious significance with Ayodhya (birthplace of Lord Rama), Mathura (birthplace of Lord Krishna), and Varanasi (one of the world's oldest continuously inhabited cities).",
      "Uttar Pradesh offers rich cultural experiences with its classical music, dance forms, handicrafts, and diverse cuisine. The state's heritage includes Mughal, Buddhist, and Hindu influences."
    ],
    category: "states"
  },
  
  // Tourist Circuits
  {
    patterns: ["golden triangle", "delhi agra jaipur", "tourist circuit", "popular tourist route"],
    responses: [
      "The Golden Triangle is India's most popular tourist circuit connecting Delhi, Agra, and Jaipur. This 720 km route showcases India's rich history from Mughal splendor to Rajput grandeur.",
      "The Golden Triangle tour typically includes the Red Fort and Qutub Minar in Delhi, the Taj Mahal in Agra, and the Amber Fort and Hawa Mahal in Jaipur. It's perfect for first-time visitors.",
      "The Golden Triangle can be completed in 4-6 days, though a week allows for a more relaxed pace. The best time to visit is from October to March when the weather is pleasant."
    ],
    category: "tourism"
  },
  {
    patterns: ["buddhist circuit", "buddhist pilgrimage", "buddha tour", "buddhism sites"],
    responses: [
      "The Buddhist Circuit covers sites significant to Buddha's life including Lumbini (birth), Bodh Gaya (enlightenment), Sarnath (first sermon), and Kushinagar (death). These span across Uttar Pradesh, Bihar, and Nepal.",
      "Key sites on the Buddhist Circuit include the Mahabodhi Temple in Bodh Gaya, Dhamek Stupa in Sarnath, and numerous monasteries. The circuit attracts pilgrims from across Asia.",
      "The Buddhist Circuit can be explored year-round, though winter (November-February) offers the most comfortable temperatures. Allow at least 7-10 days to visit the major sites properly."
    ],
    category: "tourism"
  },
  {
    patterns: ["kerala backwaters", "backwater tour", "kerala boat house", "alleppey backwaters"],
    responses: [
      "Kerala's backwaters are a network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. The most popular areas are Alleppey (Alappuzha) and Kumarakom.",
      "The best way to experience Kerala's backwaters is on a traditional houseboat (kettuvallam). These converted rice barges offer overnight stays with local cuisine as you glide through serene waters.",
      "The backwaters showcase rural Kerala life with villagers fishing, farming, and going about daily activities along the shores. The best time to visit is between September and March."
    ],
    category: "tourism"
  },
  
  // Cuisine
  {
    patterns: ["indian food", "indian cuisine", "popular dishes", "what to eat in india", "traditional food"],
    responses: [
      "Indian cuisine is incredibly diverse! Some popular dishes include butter chicken, biryani, dosa, pani puri, and various regional thalis. Each state has its own unique specialties.",
      "India's food varies greatly by region—try North Indian curries and naan, South Indian dosas and idlis, Eastern Bengali fish dishes, and Western vada pav from Mumbai.",
      "Don't miss trying authentic Indian street food like pani puri, bhel puri, and kathi rolls. For desserts, try rasgulla, gulab jamun, and jalebi!"
    ],
    category: "cuisine"
  },
  {
    patterns: ["south indian food", "south indian cuisine", "kerala food", "tamil food", "south dishes"],
    responses: [
      "South Indian cuisine features rice-based dishes like dosa, idli, uttapam, and vada served with sambar and coconut chutney. Kerala specializes in seafood and coconut-based curries.",
      "Don't miss trying a traditional South Indian thali served on a banana leaf! It typically includes rice, sambar, rasam, various vegetable preparations, and curd.",
      "South Indian filter coffee and Hyderabadi biryani are must-try specialties. Also look for appam with stew, Chettinad cuisine, and delicious desserts like Mysore pak."
    ],
    category: "cuisine"
  },
  {
    patterns: ["north indian food", "north indian cuisine", "punjabi food", "delhi food", "north dishes"],
    responses: [
      "North Indian cuisine is known for its rich, creamy curries like butter chicken and paneer tikka masala. Breads like naan, roti, and paratha are staples along with rice dishes.",
      "Punjab offers famous dishes like sarson da saag with makki di roti, butter chicken, and lassi. Delhi is known for its street food including chaat, chole bhature, and parathas.",
      "North Indian cuisine features tandoori cooking with dishes like tandoori chicken and seekh kebabs. Don't miss trying authentic chai and sweet treats like jalebi and rabri."
    ],
    category: "cuisine"
  },
  {
    patterns: ["bengali food", "bengali cuisine", "kolkata food", "west bengal food", "east indian food"],
    responses: [
      "Bengali cuisine celebrates fish and rice, with mustard oil and five-spice mixture (panch phoron) providing distinctive flavors. Famous dishes include ilish (hilsa fish), shorshe ilish (fish in mustard sauce), and various fish curries.",
      "Sweets are an integral part of Bengali cuisine - try rasgulla, sandesh, mishti doi (sweet yogurt), and roshogolla. Kolkata's street food scene includes kathi rolls, phuchka (pani puri), and jhal muri.",
      "A traditional Bengali meal follows a specific order: bitter (shukto), dal, vegetable dishes, fish, meat, chutney, and finally dessert. This progression is designed to aid digestion."
    ],
    category: "cuisine"
  },
  {
    patterns: ["gujarati food", "gujarati cuisine", "gujarat dishes", "vegetarian indian food"],
    responses: [
      "Gujarati cuisine is predominantly vegetarian and known for balancing sweet, salty, and spicy flavors. The traditional thali includes items like dhokla, khandvi, thepla, and various shaaks (vegetable dishes).",
      "Snacks (farsan) are an important part of Gujarati food culture - try dhokla, fafda, khandvi, and gathiya. The cuisine also includes unique preparations like undhiyu (mixed vegetable dish) and dal dhokli.",
      "Gujarati food often incorporates sugar or jaggery for sweetness, even in savory dishes. The cuisine is influenced by the state's climate and is designed to be nutritionally complete and light."
    ],
    category: "cuisine"
  },
  
  // Festivals
  {
    patterns: ["indian festivals", "major festivals", "festival calendar", "celebrations", "religious festivals"],
    responses: [
      "India celebrates numerous festivals throughout the year including Diwali, Holi, Eid, Christmas, Navaratri, Durga Puja, and many more regional celebrations.",
      "Diwali (Festival of Lights) is celebrated in October-November, while Holi (Festival of Colors) occurs in March. Ganesh Chaturthi is a big festival in Maharashtra in August-September.",
      "India's diversity means there's always a festival happening somewhere! From Pongal in Tamil Nadu to Bihu in Assam, each region has unique celebrations reflecting local culture."
    ],
    category: "festivals"
  },
  {
    patterns: ["diwali", "deepavali", "festival of lights"],
    responses: [
      "Diwali, the Festival of Lights, is one of India's biggest celebrations. Homes are decorated with oil lamps (diyas), rangoli patterns, and beautiful lights, followed by fireworks.",
      "Diwali celebrates the return of Lord Rama to Ayodhya after defeating Ravana. People exchange gifts, wear new clothes, prepare sweets, and worship Goddess Lakshmi for prosperity.",
      "Diwali typically falls in October or November and is celebrated throughout India with regional variations. It symbolizes the triumph of light over darkness and good over evil."
    ],
    category: "festivals"
  },
  {
    patterns: ["holi", "festival of colors", "when is holi"],
    responses: [
      "Holi, the Festival of Colors, is celebrated in March to welcome spring. People throw colored powders and water at each other, dance to music, and share festive foods.",
      "Holi begins with Holika Dahan, where bonfires symbolize the victory of good over evil. The next day is for playing with colors, enjoying sweets like gujiya, and special drinks like thandai.",
      "While Holi is celebrated throughout India, it's particularly vibrant in Mathura, Vrindavan, and Barsana—places associated with Lord Krishna. Each region has its unique Holi traditions."
    ],
    category: "festivals"
  },
  {
    patterns: ["durga puja", "durga festival", "bengal festival", "navratri in bengal"],
    responses: [
      "Durga Puja, primarily celebrated in West Bengal, is a 10-day festival honoring Goddess Durga's victory over the demon Mahishasura. Elaborate pandals (temporary structures) house beautifully crafted Durga idols.",
      "During Durga Puja, Kolkata transforms with artistic pandals, cultural performances, and festive traditions. The last four days (Saptami to Dashami) see the most intense celebrations and pandal-hopping.",
      "Durga Puja combines religious rituals with cultural events, music, dance, and feasting. On the final day (Vijaya Dashami), the idols are immersed in water bodies in an emotional procession called Bisarjan."
    ],
    category: "festivals"
  },
  {
    patterns: ["ganesh chaturthi", "ganesh festival", "ganpati festival", "ganeshotsav"],
    responses: [
      "Ganesh Chaturthi celebrates the birth of Lord Ganesha, the elephant-headed god of new beginnings. The 10-day festival is especially grand in Maharashtra, with families and communities installing Ganesha idols at home and in public pandals.",
      "During Ganesh Chaturthi, devotees offer modak (sweet dumplings), perform aarti (ritual worship), and participate in cultural events. The festival concludes with a procession taking the idol for immersion (visarjan).",
      "Mumbai's Ganesh Chaturthi is particularly famous with massive public celebrations and spectacular idols. The festival usually falls between August and September and symbolizes prosperity and good fortune."
    ],
    category: "festivals"
  },
  {
    patterns: ["onam", "kerala festival", "onam sadya", "onam celebration"],
    responses: [
      "Onam is Kerala's harvest festival celebrating King Mahabali's annual return. This 10-day festival features boat races (Vallam Kali), tiger dances (Pulikali), floral decorations (Pookalam), and the grand Onam Sadya feast.",
      "The Onam Sadya is a traditional vegetarian feast served on a banana leaf with rice and up to 26 dishes. It's essential to the celebration and showcases Kerala's culinary excellence.",
      "Onam typically falls in August-September and is celebrated by all Keralites regardless of religion. The festival includes folk performances, games, and the famous snake boat races in Alleppey's backwaters."
    ],
    category: "festivals"
  },
  
  // Heritage and History
  {
    patterns: ["indian independence", "freedom struggle", "independence movement", "british rule", "1947 independence"],
    responses: [
      "India gained independence from British colonial rule on August 15, 1947, after a long struggle led by figures like Mahatma Gandhi, Jawaharlal Nehru, Sardar Patel, and many others.",
      "The Indian independence movement included various approaches from Gandhi's non-violent civil disobedience (Satyagraha) to revolutionary activities by figures like Bhagat Singh and Subhas Chandra Bose.",
      "Independence came with the partition of British India into India and Pakistan, causing massive migration and communal violence. Despite these challenges, India established itself as the world's largest democracy."
    ],
    category: "history"
  },
  {
    patterns: ["mahatma gandhi", "father of the nation", "gandhi ji", "mohandas gandhi"],
    responses: [
      "Mahatma Gandhi (1869-1948) led India's independence movement through non-violent civil disobedience (Satyagraha). His principles inspired civil rights movements worldwide.",
      "Gandhi's key philosophies included truth (satya), non-violence (ahimsa), and self-reliance (swadeshi). He advocated for simple living, religious harmony, and the upliftment of marginalized communities.",
      "Gandhi was assassinated on January 30, 1948, shortly after India's independence. His birthday (October 2) is celebrated as Gandhi Jayanti, a national holiday, and the International Day of Non-Violence."
    ],
    category: "history"
  },
  {
    patterns: ["mughal empire", "mughal dynasty", "mughals in india", "mughal rulers"],
    responses: [
      "The Mughal Empire ruled most of the Indian subcontinent from 1526 to 1857. Founded by Babur, it reached its zenith under Akbar and Shah Jahan before declining after Aurangzeb's reign.",
      "The Mughals left a lasting cultural legacy in India, including magnificent architecture (Taj Mahal, Red Fort, Humayun's Tomb), Urdu language, cuisine, music, art, and administrative systems.",
      "Key Mughal emperors included Babur (founder), Humayun, Akbar (known for religious tolerance), Jahangir, Shah Jahan (built the Taj Mahal), and Aurangzeb (last major ruler)."
    ],
    category: "history"
  },
  
  // Geography
  {
    patterns: ["indian geography", "india landscape", "geographical features", "india terrain"],
    responses: [
      "India has incredibly diverse geography: the Himalayan mountains in the north, the Indo-Gangetic plains, the Thar Desert in the west, the central Deccan Plateau, and coastal plains along its 7,500+ km coastline.",
      "India is bordered by the Arabian Sea, Indian Ocean, and Bay of Bengal, with the Himalayan, Karakoram, and Hindu Kush mountain ranges separating it from much of Asia.",
      "India spans multiple climate zones from alpine tundra in the Himalayas to tropical rainforests in the northeast and desert in the west. This diversity contributes to its rich biodiversity and varied ecosystems."
    ],
    category: "geography"
  },
  {
    patterns: ["himalayan mountains", "himalayas", "mountain range", "highest mountains"],
    responses: [
      "The Himalayas form India's northern border, spanning five Indian states: Jammu & Kashmir, Himachal Pradesh, Uttarakhand, Sikkim, and Arunachal Pradesh. This majestic range includes Mount Everest on the Nepal-Tibet border.",
      "The Himalayas are geologically young mountains still rising by about 5mm per year. They're home to diverse ecosystems, glaciers that feed major rivers like the Ganges and Brahmaputra, and numerous sacred sites.",
      "The Himalayan region offers adventure tourism (trekking, mountaineering, river rafting), spiritual experiences (Rishikesh, Badrinath, Kedarnath), and unique cultures influenced by Hinduism, Buddhism, and tribal traditions."
    ],
    category: "geography"
  },
  {
    patterns: ["indian rivers", "major rivers", "sacred rivers", "ganges", "yamuna", "brahmaputra"],
    responses: [
      "India has seven major river systems: the Ganges, Brahmaputra, Indus, Narmada, Godavari, Krishna, and Cauvery. These rivers are vital for agriculture, transportation, and religious significance.",
      "The Ganges (Ganga) is India's most sacred river, flowing through key pilgrimage sites like Varanasi and Haridwar. The Ganges-Brahmaputra delta forms the world's largest delta and mangrove ecosystem, the Sundarbans.",
      "Indian rivers face challenges like pollution, over-extraction, and climate change impacts. The government has initiated programs like 'Namami Gange' to clean and rejuvenate the Ganges River system."
    ],
    category: "geography"
  },
  
  // Travel tips
  {
    patterns: ["best time to visit india", "when to visit", "travel seasons", "monsoon travel", "weather in india"],
    responses: [
      "The best time to visit India is generally from October to March when the weather is pleasant in most regions. Summer (April-June) can be extremely hot, while monsoon (July-September) brings heavy rainfall to many parts.",
      "For Northern India including Rajasthan and the Golden Triangle, winter (November to February) is ideal. For South India, December to March offers the most comfortable temperatures.",
      "If you're planning to visit the Himalayan regions like Ladakh or hill stations, summer months (May-July) are better as winter brings heavy snowfall and closed passes."
    ],
    category: "travel"
  },
  {
    patterns: ["travel tips for india", "india travel advice", "safety in india", "what to pack", "traveling in india"],
    responses: [
      "When traveling in India, dress modestly (especially at religious sites), carry toilet paper, drink bottled water, and always have hand sanitizer. Use reputable transportation and keep emergency contacts handy.",
      "India is diverse, so research the specific regions you're visiting. Pre-book accommodations during peak seasons, carry cash for small purchases, and be prepared for varied weather depending on the region.",
      "Try to learn basic Hindi phrases, respect local customs, remove shoes before entering homes or temples, and be mindful of photography restrictions at religious and government sites."
    ],
    category: "travel"
  },
  {
    patterns: ["india transportation", "getting around india", "trains in india", "domestic flights", "public transport"],
    responses: [
      "India has a comprehensive transportation network. Domestic flights connect major cities, while the extensive railway system is economical for longer journeys. Book train tickets in advance through IRCTC website or app.",
      "Within cities, options include metro systems (in Delhi, Mumbai, Bangalore, etc.), auto-rickshaws, cycle-rickshaws, taxis, and ride-sharing services like Uber and Ola. Some cities also have local buses.",
      "For a unique experience, try overnight train journeys or the luxury tourist trains like Palace on Wheels. In rural areas, shared jeeps and buses are common modes of transportation."
    ],
    category: "travel"
  },
  {
    patterns: ["indian visa", "e-visa india", "visa requirements", "tourist visa", "visa on arrival"],
    responses: [
      "Most foreign nationals need a visa to visit India. The e-Visa facility is available for tourists from 169 countries and can be applied for online at least 4 days before arrival.",
      "India offers several visa types including tourist, business, medical, and conference visas. Tourist e-Visas are typically valid for 30 days, 1 year, or 5 years depending on the option selected.",
      "Required documents for an Indian visa typically include a passport valid for at least 6 months, recent photo, return ticket information, and proof of accommodation and sufficient funds."
    ],
    category: "travel"
  },
  
  // Cultural aspects
  {
    patterns: ["indian classical dance", "dance forms", "traditional dance", "dance styles"],
    responses: [
      "India has eight classical dance forms: Bharatanatyam (Tamil Nadu), Kathakali (Kerala), Kathak (North India), Odissi (Odisha), Kuchipudi (Andhra Pradesh), Manipuri (Manipur), Mohiniyattam (Kerala), and Sattriya (Assam).",
      "Bharatanatyam is known for its geometric positions and expressive storytelling, while Kathakali is famous for elaborate makeup and costumes telling mythological stories.",
      "Besides classical forms, India has numerous folk dances like Bhangra (Punjab), Garba (Gujarat), Bihu (Assam), and Ghoomar (Rajasthan) that are integral to regional celebrations."
    ],
    category: "culture"
  },
  {
    patterns: ["indian music", "classical music", "music traditions", "indian instruments", "folk music"],
    responses: [
      "Indian classical music has two major traditions: Hindustani (North) and Carnatic (South). It's based on ragas (melodic frameworks) and talas (rhythmic patterns).",
      "Traditional Indian instruments include the sitar, tabla, veena, santoor, flute, and sarangi. Each has a unique sound and plays a crucial role in classical and folk music.",
      "The diversity of Indian music is reflected in its rich array of traditional instruments, from the percussive tabla to the melodic sitar, each with a deep cultural significance."
    ],
    category: "culture"
  }
];
