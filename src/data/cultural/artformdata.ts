// Art forms detailed information with descriptions, history and images
import { stateData } from "../stateData";

// Map of state IDs to specific art form details
export type ArtFormDetails = {
  id: string;
  name: string;
  description: string;
  history: {
    started: string;
    goldenPeriod: string;
    currentStatus: string;
  };
  image: string;
  additionalImages: string[];
};

// Mapping art forms to specific information
export const artFormDetailsMap: Record<string, ArtFormDetails> = {
  kathputli: {
    id: "kathputli",
    name: "Kathputli",
    description:
      "Kathputli (puppetry) is a traditional folk art from Rajasthan, where colorful wooden puppets are manipulated with strings to narrate folk tales, myths, and social stories.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century during Rajput rule",
      currentStatus: "Facing challenges but preserved through cultural troupes",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/India_Mandawa_marionetas_01_ni.JPG",
    additionalImages: [
      "https://s7ap1.scene7.com/is/image/incredibleindia/kathputli-ka-khel-jaipur-rajasthan-1-craft-hero?qlt=82&ts=1726641305694",
      "https://thumbs.dreamstime.com/b/rajasthani-puppets-sale-3956219.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLrNAoUejJj-JNRXOUjm54BQz0x39XrgXmkvRCnt423i_8sh5vLo7dNDoPrVWCde33vI&usqp=CAU",
    ],
  },
  ghoomar: {
    id: "ghoomar",
    name: "Ghoomar",
    description:
      "Ghoomar is a traditional folk dance from Rajasthan performed by women, characterized by swirling movements and vibrant costumes.",
    history: {
      started: "Medieval period",
      goldenPeriod: "16th-18th century during Rajput rule",
      currentStatus: "Popular at weddings and cultural festivals",
    },
    image:
      "https://www.unnatisilks.com/cdn/shop/articles/c58573035b584798c80b5e7f2cfdeb89-scaled.jpg?v=1655289712&width=2560",
    additionalImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg/473px-Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg",
      "https://cdn.shopify.com/s/files/1/0562/8792/0217/t/7/assets/27464776076_6152cf2606_z.jpg?v=1655289702",
      "https://i0.wp.com/www.sayeridiary.com/wp-content/uploads/2018/04/Original-Rajasthani-Ghoomar-Dance-Song-660x330.jpg?fit=660%2C330&ssl=1",
    ],
  },
  kalbeliya: {
    id: "kalbeliya",
    name: "Kalbeliya",
    description:
      "Kalbeliya is a sensuous folk dance from Rajasthan performed by the Kalbeliya community, known for its snake-like movements and vibrant attire.",
    history: {
      started: "Medieval period",
      goldenPeriod: "17th-19th century",
      currentStatus: "Recognized as a UNESCO Intangible Cultural Heritage",
    },
    image:
      "https://blackhattalent.com/wp-content/uploads/2024/10/Kalbeliya.jpeg",
    additionalImages: [
      "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Kalbelia-Dance-Festival-Rajasthan.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://i.pinimg.com/736x/85/a0/69/85a069edcb956f85470429cf8d01d6f7.jpg",
    ],
  },
  kathakali: {
    id: "kathakali",
    name: "Kathakali",
    description:
      "Kathakali is a classical dance form from Kerala, featuring elaborate costumes, makeup, and stylized gestures to portray stories from Hindu epics. Performers train rigorously to master the precise facial expressions and body movements essential to this art form.",
    history: {
      started: "17th century",
      goldenPeriod: "18th to 19th century",
      currentStatus:
        "Actively preserved through dedicated schools and cultural institutions",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Kathakali_-Play_with_Kaurava.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://mapacademy.io/wp-content/uploads/2022/04/kathakali-1m.jpg",
      "https://mediaim.expedia.com/localexpert/213788/532e75b6-04d7-4b01-9a0c-0a41fcd3094c.jpg",
    ],
  },
  mohiniyattam: {
    id: "mohiniyattam",
    name: "Mohiniyattam",
    description:
      "Mohiniyattam is a classical dance form from Kerala, characterized by graceful movements and expressions, often depicting themes of love and devotion.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Revived and promoted through cultural programs",
    },
    image:
      "https://iccr.gov.in/sites/default/files/Ms.Anita%20peter%20%26%20her%20group%2C%20Mohiniyattam%20Dance%20from%20Hyderabad.jpeg",
    additionalImages: [
      "https://www.natyasutraonline.com/uploads/category/share_img/mohiniyattam.jpg",
      "https://www.civilsdaily.com/wp-content/uploads/2024/06/mohini.jpg",
      "https://www.insightsonindia.com/wp-content/uploads/2021/09/Mohiniattam.jpg",
    ],
  },
  kalaripayattu: {
    id: "kalaripayattu",
    name: "Kalaripayattu",
    description:
      "Kalaripayattu is an ancient martial art from Kerala, combining combat techniques, physical exercises, and healing practices.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "12th-16th century",
      currentStatus: "Thriving as a martial art and fitness practice",
    },
    image:
      "https://images.mid-day.com/images/images/2014/jun/05kalaripayattu.jpg",
    additionalImages: [
      "https://storage.karmagroup.com/assets/karmagroup.com/blog/2018/03/KALARIPAYATTU-940x671.jpg",
      "https://www.keralatourism.org/images/kalari/static-banner/large/Vadivu_-12022020151336.jpg",
      "https://www.rishikulyogshala.org/assets/images/kalaripayattu/kalaripayattu-img1.jpg",
    ],
  },
  bharatanatyam: {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    description:
      "Bharatanatyam is one of India's oldest classical dance forms, originating from Tamil Nadu, featuring precise footwork and hand gestures.",
    history: {
      started: "2000 BCE",
      goldenPeriod: "Chola Dynasty (9th-13th century)",
      currentStatus: "Widely practiced across India and internationally",
    },
    image: "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
    additionalImages: [
      "https://natyalaya.org/wp-content/uploads/2019/02/barathanatyam-dance-classes-in-bangalore-1024x535.jpg",
      "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
      "https://images.squarespace-cdn.com/content/v1/60c7105b70fe8d18bb55fa5c/1624000918568-56FS9SI40BU7HCROUYO0/13123030_993619280706392_1702075096596948457_o.jpg",
    ],
  },
  "carnatic-music": {
    id: "carnatic-music",
    name: "Carnatic Music",
    description:
      "Carnatic music is a classical music tradition from South India, focusing on vocal and instrumental performances with intricate ragas and talas.",
    history: {
      started: "5th century CE",
      goldenPeriod: "16th-18th century",
      currentStatus: "Thriving in concerts and educational institutions",
    },
    image:
      "https://lh3.googleusercontent.com/eQnHNBkq2tFOAqbJASMX_GFeVCutcBsv8ZOHu1JfU6svp_CCBZqEhb7UKPSaHFkFVptumYxPTDeybDOzU_Een7btHg=w1200-h630-pp",
    additionalImages: [
      "https://fl-i.thgim.com/public/incoming/vn7gxw/article67119307.ece/alternates/LANDSCAPE_1200/1693_10-12-2018_11-29-47_1_RANJANI_GAYATRI_CARNATIC_VOCAL.JPG",
      "https://media.licdn.com/dms/image/v2/C5112AQESeCzBXl8Y7A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1572354781329?e=2147483647&v=beta&t=58Nls7E8hHHKHUmyiWaFKEWTgJngNcwL82WaQgpLkDA",
      "https://images.livemint.com/img/2024/01/19/original/carnatic_1705643562430.jpg",
    ],
  },
  "tanjore-paintings": {
    id: "tanjore-paintings",
    name: "Tanjore Paintings",
    description:
      "Tanjore paintings are traditional South Indian artworks known for rich colors and gold foil detailing, often depicting Hindu deities.",
    history: {
      started: "16th century",
      goldenPeriod: "17th-19th century",
      currentStatus:
        "Continues to be popular among collectors and religious patrons",
    },
    image:
      "https://img1.wsimg.com/isteam/ip/bd95d888-15fd-4e22-9514-3b3e7856faa7/d1fc0d4d-12eb-4019-a7aa-f00566d84891.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-xyju65m1ey0EMV1KPn2m46q8mlIZUaz3Q&s",
      "https://4.imimg.com/data4/KY/YL/MY-3723800/tanjore-paintings.jpg",
      "https://c9admin.cottage9.com/uploads/1945/tanjore-paintings_1.jpg",
    ],
  },
  "nati-dance": {
    id: "nati-dance",
    name: "Nati Dance",
    description:
      "Nati is a traditional folk dance from Himachal Pradesh, performed during festivals and celebrations, characterized by rhythmic footwork and vibrant costumes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus: "Preserved through local festivals and cultural programs",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kinnauri_Nati_dance.jpg",
    additionalImages: [
      "https://64.media.tumblr.com/9d1e08fa4412961b000e0eb96219b498/9b69d77883e821ae-2b/s1280x1920/7ec773d8d848b9d9a753e50af7c504a9f63f5c40.jpg",
      "https://64.media.tumblr.com/e8c0250f9677e6f85cd1bf7b8b70131f/9b69d77883e821ae-c9/s1280x1920/063171053d2b926d236f8364c3e7ab1561aa2cd4.jpg",
      "https://thumbs.dreamstime.com/z/kullu-himachal-pradesh-india-st-july-group-himachali-women-dancing-nati-dance-traditional-folk-dance-upper-himachal-259961182.jpg",
    ],
  },
  "thangka-paintings": {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    description:
      "Thangka paintings are traditional Tibetan Buddhist scroll paintings, depicting deities, mandalas, and religious narratives.",
    history: {
      started: "7th century CE",
      goldenPeriod: "11th-15th century",
      currentStatus: "Preserved by monasteries and artisans",
    },
    image:
      "https://v.greattibettour.com/photos/201904/tibetan-thangka--44339.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdWBzsM75fK9MK-DFkdM5a5v_S0y-T5SnWg&s",
      "https://i1.himalayas.life/c/u/f67894297b6134a6b759b3a9ec15b6cb/2018/04/26054954/26-e1522558104714.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVX92htoKwCc4tDToVkM1jB4uN3Fym2-8zAA&s",
    ],
  },
  "chamba-rumal": {
    id: "chamba-rumal",
    name: "Chamba Rumal",
    description:
      "Chamba Rumal is a traditional embroidery art from Himachal Pradesh, featuring intricate hand-stitched designs on handkerchiefs and textiles.",
    history: {
      started: "17th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Preserved through cultural initiatives and museums",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Chamba_Rumal_with_the_Mahavidyas_LACMA_M.80.4.jpg",
    additionalImages: [
      "https://amounee.com/cdn/shop/products/16571829871953209506_fa0d1252-0065-4d39-862b-d3ed3f85326c.jpg?v=1700035335",
      "https://indiacurrents.com/wp-content/uploads/2021/05/Chamba-Rumal-art-work-1.jpg",
      "https://www.bridgebharat.com/cdn/shop/files/BBP0050SCR00008_1_533x.jpg?v=1707767544",
    ],
  },
  "fado-music": {
    id: "fado-music",
    name: "Fado Music",
    description:
      "Fado is a soulful music genre from Goa, influenced by Portuguese traditions, expressing themes of longing and nostalgia.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Revived through cultural programs and festivals",
    },
    image: "https://i.ytimg.com/vi/sFjeMZomano/maxresdefault.jpg",
    additionalImages: [
      "https://lisbongo.com/wp-content/uploads/2020/04/Fado-Music-in-Lisbon-scaled.jpg",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/55/58/2a.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfkxKBlFqUttS-obx47fBtysj9tSqS2xuuWE67cbznchHn97aIwlYzicSp884zYcHITqI&usqp=CAU",
    ],
  },
  "goan-carnival": {
    id: "goan-carnival",
    name: "Goan Carnival",
    description:
      "The Goan Carnival is a vibrant festival celebrated in Goa, featuring parades, music, dance, and colorful floats, reflecting Portuguese influence.",
    history: {
      started: "18th century",
      goldenPeriod: "19th-20th century",
      currentStatus: "A major tourist attraction and cultural event",
    },
    image:
      "https://images.deccanherald.com/deccanherald%2F2025-02-18%2Fexz5zstu%2Fgoa_20carnival_20parade_1582412402.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
    additionalImages: [
      "https://static.toiimg.com/photo/89864714.cms",
      "https://i0.wp.com/www.easeindiatrip.com/blog/wp-content/uploads/2025/02/Goa-Goa-Carnival-festival.jpg?fit=1024%2C630&ssl=1",
      "https://traveltradejournal.com/wp-content/uploads/2023/02/Goa-Carnival.jpg",
    ],
  },
  "traditional-pottery": {
    id: "traditional-pottery",
    name: "Traditional Pottery",
    description:
      "Traditional pottery is an ancient craft practiced across India, creating functional and decorative items using clay.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus: "Still widely practiced and appreciated",
    },
    image: "https://c1.wallpaperflare.com/path/844/408/847/pottery-clay-art-craftsman-37a762148f1692812588c0c935fa5c2b.jpg",
    additionalImages: [
      "https://decodemalayalam.com/wp-content/uploads/2024/07/3-4-1024x576.jpg",
      "https://poothali.com/wp-content/uploads/2023/08/Traditional-Pottery-in-Erikkulam.jpg",
      "https://images.indianexpress.com/2019/11/pottery759.jpeg",
    ],
  },
  kuchipudi: {
    id: "kuchipudi",
    name: "Kuchipudi",
    description:
      "Kuchipudi is a classical dance form from Andhra Pradesh, known for its graceful movements, dramatic expressions, and intricate footwork. It combines storytelling with devotion, often depicting themes from Hindu epics.",
    history: {
      started: "2nd century BCE",
      goldenPeriod: "16th-18th century under Vijayanagara Empire",
      currentStatus:
        "Thriving globally through performances and training institutions",
    },
    image:
      "https://static.wixstatic.com/media/cc46ab_1b612e0946414aafa2556fa83af2fa09~mv2.jpg/v1/fill/w_1000,h_798,al_c,q_85,usm_0.66_1.00_0.01/cc46ab_1b612e0946414aafa2556fa83af2fa09~mv2.jpg",
    additionalImages: [
      "https://www.soulveda.com/wp-content/uploads/2023/09/kuchipudi-dance-form-of-india.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY6Uv5sJt9ZmR4xW5eLpjljKSm2F8h6O_hA&s",
      "https://www.culturalindia.net/iliimages/Kuchipudi-1-1600.jpg",
    ],
  },
  "nakshi-kantha-embroidery": {
    id: "nakshi-kantha-embroidery",
    name: "Nakshi Kantha Embroidery",
    description:
      "Nakshi Kantha is a traditional embroidery art from Bengal, created by stitching layers of old cloth together with colorful threads. The designs often depict folk motifs, nature, and religious symbols.",
    history: {
      started: "Medieval period",
      goldenPeriod: "16th-19th century",
      currentStatus: "Preserved through artisans and cultural initiatives",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl13kZ_P9VkcAj8tKbGbLBqvRDvEvr7hkplQ&s",
    additionalImages: [
      "https://i.pinimg.com/736x/b2/47/21/b24721be4da0945c73b57c1ac57c08c0.jpg",
      "https://i.pinimg.com/564x/a9/af/8b/a9af8b9a941f4c299e4a18b32e6000ad.jpg",
      "https://cdn.webshopapp.com/shops/312522/files/426873767/takdira-bloemontwerpblog.jpg",
    ],
  },
  "kalamkari-paintings": {
    id: "kalamkari-paintings",
    name: "Kalamkari Paintings",
    description:
      "Kalamkari is a traditional hand-painted or block-printed textile art from Andhra Pradesh and Telangana, featuring intricate designs inspired by mythology, nature, and folklore.",
    history: {
      started: "Ancient times (3000 BCE)",
      goldenPeriod: "Mughal era (16th-17th century)",
      currentStatus: "Revived through government initiatives and global demand",
    },
    image:
      "https://crafttatva.com/cdn/shop/files/a_4_dd255daa-a1af-427f-85b4-462dc44efaba.jpg?v=1700845295",
    additionalImages: [
      "https://www.utsavpedia.com/wp-content/uploads/2014/06/kalamkari.jpg",
      "https://gaonkasaman.com/cdn/shop/files/20231120_130522.jpg?v=1702271201",
      "https://m.media-amazon.com/images/I/71b674804bL._AC_UF1000,1000_QL80_.jpg",
    ],
  },
  "aji-lhamu-dance": {
    id: "aji-lhamu-dance",
    name: "Aji Lhamu Dance",
    description:
      "Aji Lhamu is a traditional masked dance-drama from Sikkim, performed during festivals to depict stories of deities, demons, and historical events. It combines music, dance, and elaborate costumes.",
    history: {
      started: "17th century",
      goldenPeriod: "18th-19th century under the Namgyal dynasty",
      currentStatus: "Preserved through monasteries and cultural festivals",
    },
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZvsyBPwIO39LNfYrh6VpMM6q46FtoCkeP_IP2BCo0IkDrB8wovguOuMUwEDqk269qbOyZaX59nMkZz5f1bNb9JWy3_H9eX0CPqhZk9ggOEiPdyWZfuSL0Xrk5I77CsaPSuFZozbWiAXg/s1600/Aji-Lhamu-Dance.jpg",
    additionalImages: [
      "https://www.researchgate.net/publication/329190991/figure/fig13/AS:697212736651264@1543239878221/Aji-Lhamu-Dance-Fig-66-Yak-Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemCOzizwko5tI2BiTYvEde5vThrxGngciRQ&s",
      "https://www.caleidoscope.in/wp-content/uploads/2020/02/Folk-Dance-Forms-of-Northeast-India-Shad-Suk-Mynsiem-Meghalaya.jpg",
    ],
  },
  " thangka-paintings": {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    description:
      "Thangka paintings are traditional Tibetan Buddhist scroll paintings, depicting deities, mandalas, and religious narratives.",
    history: {
      started: "7th century CE",
      goldenPeriod: "11th-15th century",
      currentStatus: "Preserved by monasteries and artisans",
    },
    image:
      "https://v.greattibettour.com/photos/201904/tibetan-thangka--44339.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdWBzsM75fK9MK-DFkdM5a5v_S0y-T5SnWg&s",
      "https://i1.himalayas.life/c/u/f67894297b6134a6b759b3a9ec15b6cb/2018/04/26054954/26-e1522558104714.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVX92htoKwCc4tDToVkM1jB4uN3Fym2-8zAA&s",
    ],
  },
  "bamboo-craft": {
    id: "bamboo-craft",
    name: "Bamboo Craft",
    description:
      "Bamboo craft is an ancient art form practiced across India, using bamboo to create functional items like baskets, mats, and decorative objects. It reflects the sustainable use of natural resources.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqv6aUCAn0Bed1r--lZGGnM3pd9rrcXJmdFA&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWDCY2Y35c7jNeRe4EUztTTkgVn4AMvO-WZQ&s",
      "https://www.dsource.in/sites/default/files/styles/mini_responsivecustom_user_moblie_1x/public/resource/bamboo-craft-vellore/products/minigallery/13114/03.jpg?itok=jLk5GAdp&timestamp=1459765907",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/bamboo-craft-india.jpg",
    ],
  },
  "bihu-dance": {
    id: "bihu-dance",
    name: "Bihu Dance",
    description:
      "Bihu dance is a vibrant folk dance from Assam, performed during the Bihu festival to celebrate the arrival of spring and harvest seasons. It is characterized by energetic movements, traditional attire, and rhythmic music.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-18th century during Ahom rule",
      currentStatus: "Celebrated widely during festivals and cultural events",
    },
    image: "https://stagebuzz.in/wp-content/uploads/2021/03/1.png",
    additionalImages: [
      "https://m.economictimes.com/thumb/msid-99483942,width-1200,height-1200,resizemode-4,imgsize-165930/bihu-2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFn00ovb0atlyDuly_AMZtUhNF1KjvkNAm6w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRinSxLbkTyDnMMJcLwv0BkX8vMaJeh3y0bnQ&s",
    ],
  },
  " bamboo-craft": {
    id: "bamboo-craft",
    name: "Bamboo Craft",
    description:
      "Bamboo craft is an ancient art form practiced across India, using bamboo to create functional items like baskets, mats, and decorative objects. It reflects the sustainable use of natural resources.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Bamboo-Craft-India.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.indianmirror.com/culture/bamboo-craft/bamboo-craft.jpg",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/bamboo-craft-india.jpg",
    ],
  },
  "xophura-weaving": {
    id: "xophura-weaving",
    name: "Xophura Weaving",
    description:
      "Xophura weaving is a traditional handloom art from Assam, known for its intricate designs and vibrant colors. The fabric is often used to create traditional garments like Mekhela Chadors.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Ahom dynasty (13th-18th century)",
      currentStatus: "Preserved through local weavers and cultural initiatives",
    },
    image:
      "https://media.assettype.com/newindianexpress%2F2024-08-06%2Femhi1378%2FHandloo.jpg",
    additionalImages: [
      "https://th-i.thgim.com/public/society/article16693557.ece/alternates/LANDSCAPE_1200/MAMP25AAHANDLOOM",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqiUgAOXz4Lh9XXt4kNmKlHqh50Ovd-PJVg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HlqBH5X1yLEnQ5SpQalTdLAOnUMkXu3vNA&s",
    ],
  },
  " kathputli": {
    id: "kathputli",
    name: "Kathputli",
    description:
      "Kathputli (puppetry) is a traditional folk art from Rajasthan, where colorful wooden puppets are manipulated with strings to narrate folk tales, myths, and social stories.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century during Rajput rule",
      currentStatus: "Facing challenges but preserved through cultural troupes",
    },
    image:
      "https://5.imimg.com/data5/MV/FG/XE/SELLER-5333512/rajasthani-puppet-kathputli.jpg",
    additionalImages: [
      "https://s7ap1.scene7.com/is/image/incredibleindia/kathputli-ka-khel-jaipur-rajasthan-1-craft-hero?qlt=82&ts=1726641305694",
      "https://thumbs.dreamstime.com/b/rajasthani-puppets-sale-3956219.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLrNAoUejJj-JNRXOUjm54BQz0x39XrgXmkvRCnt423i_8sh5vLo7dNDoPrVWCde33vI&usqp=CAU",
    ],
  },
  " ghoomar": {
    id: "ghoomar",
    name: "Ghoomar",
    description:
      "Ghoomar is a traditional folk dance from Rajasthan performed by women, characterized by swirling movements and vibrant costumes.",
    history: {
      started: "Medieval period",
      goldenPeriod: "16th-18th century during Rajput rule",
      currentStatus: "Popular at weddings and cultural festivals",
    },
    image:
      "https://www.unnatisilks.com/cdn/shop/articles/c58573035b584798c80b5e7f2cfdeb89-scaled.jpg?v=1655289712&width=2560",
    additionalImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg/473px-Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg",
      "https://cdn.shopify.com/s/files/1/0562/8792/0217/t/7/assets/27464776076_6152cf2606_z.jpg?v=1655289702",
      "https://i0.wp.com/www.sayeridiary.com/wp-content/uploads/2018/04/Original-Rajasthani-Ghoomar-Dance-Song-660x330.jpg?fit=660%2C330&ssl=1",
    ],
  },
  " kalbeliya": {
    id: "kalbeliya",
    name: "Kalbeliya",
    description:
      "Kalbeliya is a sensuous folk dance from Rajasthan performed by the Kalbeliya community, known for its snake-like movements and vibrant attire.",
    history: {
      started: "Medieval period",
      goldenPeriod: "17th-19th century",
      currentStatus: "Recognized as a UNESCO Intangible Cultural Heritage",
    },
    image:
      "https://blackhattalent.com/wp-content/uploads/2024/10/Kalbeliya.jpeg",
    additionalImages: [
      "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Kalbelia-Dance-Festival-Rajasthan.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://i.pinimg.com/736x/85/a0/69/85a069edcb956f85470429cf8d01d6f7.jpg",
    ],
  },
  " kathakali": {
    id: "kathakali",
    name: "Kathakali",
    description:
      "Kathakali is a classical dance form from Kerala, featuring elaborate costumes, makeup, and stylized gestures to portray stories from Hindu epics. Performers train rigorously to master the precise facial expressions and body movements essential to this art form.",
    history: {
      started: "17th century",
      goldenPeriod: "18th to 19th century",
      currentStatus:
        "Actively preserved through dedicated schools and cultural institutions",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Kathakali_-Play_with_Kaurava.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://mapacademy.io/wp-content/uploads/2022/04/kathakali-1m.jpg",
      "https://mediaim.expedia.com/localexpert/213788/532e75b6-04d7-4b01-9a0c-0a41fcd3094c.jpg",
    ],
  },
  " mohiniyattam": {
    id: "mohiniyattam",
    name: "Mohiniyattam",
    description:
      "Mohiniyattam is a classical dance form from Kerala, characterized by graceful movements and expressions, often depicting themes of love and devotion.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Revived and promoted through cultural programs",
    },
    image:
      "https://iccr.gov.in/sites/default/files/Ms.Anita%20peter%20%26%20her%20group%2C%20Mohiniyattam%20Dance%20from%20Hyderabad.jpeg",
    additionalImages: [
      "https://www.natyasutraonline.com/uploads/category/share_img/mohiniyattam.jpg",
      "https://www.civilsdaily.com/wp-content/uploads/2024/06/mohini.jpg",
      "https://www.insightsonindia.com/wp-content/uploads/2021/09/Mohiniattam.jpg",
    ],
  },
  " kalaripayattu": {
    id: "kalaripayattu",
    name: "Kalaripayattu",
    description:
      "Kalaripayattu is an ancient martial art from Kerala, combining combat techniques, physical exercises, and healing practices.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "12th-16th century",
      currentStatus: "Thriving as a martial art and fitness practice",
    },
    image:
      "https://images.mid-day.com/images/images/2014/jun/05kalaripayattu.jpg",
    additionalImages: [
      "https://storage.karmagroup.com/assets/karmagroup.com/blog/2018/03/KALARIPAYATTU-940x671.jpg",
      "https://www.keralatourism.org/images/kalari/static-banner/large/Vadivu_-12022020151336.jpg",
      "https://www.rishikulyogshala.org/assets/images/kalaripayattu/kalaripayattu-img1.jpg",
    ],
  },
  " bharatanatyam": {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    description:
      "Bharatanatyam is one of India's oldest classical dance forms, originating from Tamil Nadu, featuring precise footwork, intricate hand gestures (mudras), and expressive facial movements to convey stories from Hindu mythology and spiritual themes.",
    history: {
      started: "2000 BCE",
      goldenPeriod: "Chola Dynasty (9th-13th century)",
      currentStatus:
        "Widely practiced across India and internationally, taught in dance schools globally",
    },
    image: "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
    additionalImages: [
      "https://natyalaya.org/wp-content/uploads/2019/02/barathanatyam-dance-classes-in-bangalore-1024x535.jpg",
      "https://images.squarespace-cdn.com/content/v1/60c7105b70fe8d18bb55fa5c/1624000918568-56FS9SI40BU7HCROUYO0/13123030_993619280706392_1702075096596948457_o.jpg",
      "https://www.thebetterindia.com/wp-content/uploads/2020/09/Bharatanatyam-Dance.jpg",
    ],
  },
  " carnatic-music": {
    id: "carnatic-music",
    name: "Carnatic Music",
    description:
      "Carnatic music is a classical music tradition from South India, focusing on vocal and instrumental performances with intricate ragas (melodic scales) and talas (rhythmic cycles). It emphasizes improvisation and devotion.",
    history: {
      started: "5th century CE",
      goldenPeriod: "16th-18th century during the Vijayanagara Empire",
      currentStatus:
        "Thriving in concerts, temples, and educational institutions worldwide",
    },
    image:
      "https://lh3.googleusercontent.com/eQnHNBkq2tFOAqbJASMX_GFeVCutcBsv8ZOHu1JfU6svp_CCBZqEhb7UKPSaHFkFVptumYxPTDeybDOzU_Een7btHg=w1200-h630-pp",
    additionalImages: [
      "https://fl-i.thgim.com/public/incoming/vn7gxw/article67119307.ece/alternates/LANDSCAPE_1200/1693_10-12-2018_11-29-47_1_RANJANI_GAYATRI_CARNATIC_VOCAL.JPG",
      "https://media.licdn.com/dms/image/v2/C5112AQESeCzBXl8Y7A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1572354781329?e=2147483647&v=beta&t=58Nls7E8hHHKHUmyiWaFKEWTgJngNcwL82WaQgpLkDA",
      "https://images.livemint.com/img/2024/01/19/original/carnatic_1705643562430.jpg",
    ],
  },
  " tanjore-paintings": {
    id: "tanjore-paintings",
    name: "Tanjore Paintings",
    description:
      "Tanjore paintings are traditional South Indian artworks known for their rich colors, gold foil detailing, and intricate designs, often depicting Hindu deities and mythological scenes.",
    history: {
      started: "16th century under the Nayak and Maratha rulers",
      goldenPeriod: "17th-19th century",
      currentStatus:
        "Continues to be popular among collectors, religious patrons, and cultural enthusiasts",
    },
    image:
      "https://img1.wsimg.com/isteam/ip/bd95d888-15fd-4e22-9514-3b3e7856faa7/d1fc0d4d-12eb-4019-a7aa-f00566d84891.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-xyju65m1ey0EMV1KPn2m46q8mlIZUaz3Q&s",
      "https://4.imimg.com/data4/KY/YL/MY-3723800/tanjore-paintings.jpg",
      "https://c9admin.cottage9.com/uploads/1945/tanjore-paintings_1.jpg",
    ],
  },
  " nati-dance": {
    id: "nati-dance",
    name: "Nati Dance",
    description:
      "Nati is a traditional folk dance from Himachal Pradesh, performed during festivals and celebrations, characterized by rhythmic footwork and vibrant costumes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus: "Preserved through local festivals and cultural programs",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kinnauri_Nati_dance.jpg",
    additionalImages: [
      "https://64.media.tumblr.com/9d1e08fa4412961b000e0eb96219b498/9b69d77883e821ae-2b/s1280x1920/7ec773d8d848b9d9a753e50af7c504a9f63f5c40.jpg",
      "https://64.media.tumblr.com/e8c0250f9677e6f85cd1bf7b8b70131f/9b69d77883e821ae-c9/s1280x1920/063171053d2b926d236f8364c3e7ab1561aa2cd4.jpg",
      "https://thumbs.dreamstime.com/z/kullu-himachal-pradesh-india-st-july-group-himachali-women-dancing-nati-dance-traditional-folk-dance-upper-himachal-259961182.jpg",
    ],
  },
  " thangka- paintings": {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    description:
      "Thangka paintings are traditional Tibetan Buddhist scroll paintings, depicting deities, mandalas, and religious narratives.",
    history: {
      started: "7th century CE",
      goldenPeriod: "11th-15th century",
      currentStatus: "Preserved by monasteries and artisans",
    },
    image:
      "https://v.greattibettour.com/photos/201904/tibetan-thangka--44339.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdWBzsM75fK9MK-DFkdM5a5v_S0y-T5SnWg&s",
      "https://i1.himalayas.life/c/u/f67894297b6134a6b759b3a9ec15b6cb/2018/04/26054954/26-e1522558104714.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVX92htoKwCc4tDToVkM1jB4uN3Fym2-8zAA&s",
    ],
  },
  " chamba-rumal": {
    id: "chamba-rumal",
    name: "Chamba Rumal",
    description:
      "Chamba Rumal is a traditional embroidery art from Himachal Pradesh, featuring intricate hand-stitched designs on handkerchiefs and textiles.",
    history: {
      started: "17th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Preserved through cultural initiatives and museums",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Chamba_Rumal_with_the_Mahavidyas_LACMA_M.80.4.jpg",
    additionalImages: [
      "https://amounee.com/cdn/shop/products/16571829871953209506_fa0d1252-0065-4d39-862b-d3ed3f85326c.jpg?v=1700035335",
      "https://indiacurrents.com/wp-content/uploads/2021/05/Chamba-Rumal-art-work-1.jpg",
      "https://www.bridgebharat.com/cdn/shop/files/BBP0050SCR00008_1_533x.jpg?v=1707767544",
    ],
  },
  " fado-music": {
    id: "fado-music",
    name: "Fado Music",
    description:
      "Fado is a soulful music genre from Goa, influenced by Portuguese traditions, expressing themes of longing, nostalgia, and melancholy through poetic lyrics and heartfelt melodies.",
    history: {
      started: "16th century during Portuguese colonization",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Revived through cultural programs, festivals, and modern adaptations",
    },
    image: "https://i.ytimg.com/vi/sFjeMZomano/maxresdefault.jpg",
    additionalImages: [
      "https://lisbongo.com/wp-content/uploads/2020/04/Fado-Music-in-Lisbon-scaled.jpg",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/55/58/2a.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfkxKBlFqUttS-obx47fBtysj9tSqS2xuuWE67cbznchHn97aIwlYzicSp884zYcHITqI&usqp=CAU",
    ],
  },
  " goan-carnival": {
    id: "goan-carnival",
    name: "Goan Carnival",
    description:
      "The Goan Carnival is a vibrant festival celebrated in Goa, featuring parades, music, dance, and colorful floats, reflecting Portuguese influence and showcasing the region's cultural vibrancy.",
    history: {
      started: "18th century during Portuguese rule",
      goldenPeriod: "19th-20th century",
      currentStatus:
        "A major tourist attraction and cultural event, celebrated annually before Lent",
    },
    image:
      "https://images.deccanherald.com/deccanherald%2F2025-02-18%2Fexz5zstu%2Fgoa_20carnival_20parade_1582412402.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
    additionalImages: [
      "https://static.toiimg.com/photo/89864714.cms",
      "https://i0.wp.com/www.easeindiatrip.com/blog/wp-content/uploads/2025/02/Goa-Goa-Carnival-festival.jpg?fit=1024%2C630&ssl=1",
      "https://traveltradejournal.com/wp-content/uploads/2023/02/Goa-Carnival.jpg",
    ],
  },
  " traditional-pottery": {
    id: "traditional-pottery",
    name: "Traditional Pottery",
    description:
      "Traditional pottery is an ancient craft practiced across India, creating functional and decorative items using clay, often reflecting regional styles and techniques.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Still widely practiced and appreciated, though facing challenges from modern alternatives",
    },
    image: "https://originalhandicraft.org/wp-content/uploads/IMG_1683.jpg",
    additionalImages: [
      "https://decodemalayalam.com/wp-content/uploads/2024/07/3-4-1024x576.jpg",
      "https://poothali.com/wp-content/uploads/2023/08/Traditional-Pottery-in-Erikkulam.jpg",
      "https://images.indianexpress.com/2019/11/pottery759.jpeg",
    ],
  },
  "garba-dance": {
    id: "garba-dance",
    name: "Garba Dance",
    description:
      "Garba is a traditional folk dance from Gujarat, performed during the Navratri festival to honor the goddess Durga. It involves rhythmic clapping, twirling movements, and vibrant traditional attire.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period under Chavda and Solanki dynasties",
      currentStatus:
        "Celebrated widely during Navratri and cultural events globally",
    },
    image:
      "https://m.economictimes.com/thumb/height-450,width-600,imgsize-653360,msid-113790108/ahmedabad-performers-dressed-in-traditional-attire-rehearse-for-garba-a-tradit-.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgasNSpJccZLF98jTnBtCN-iUj3xfZ5-SXQ&s",
      "https://img.freepik.com/premium-photo/navratri-garba-dance-festival_762785-283102.jpg?w=360",
      "https://i.pinimg.com/564x/46/d1/da/46d1da6366c250f94d44038e2003abe3.jpg",
    ],
  },
  "patola-weaving": {
    id: "patola-weaving",
    name: "Patola Weaving",
    description:
      "Patola weaving is a traditional handloom art from Gujarat, known for its intricate double ikat patterns and vibrant colors. The fabric is considered a symbol of wealth and prestige.",
    history: {
      started: "12th century",
      goldenPeriod: "17th-19th century under the patronage of royal families",
      currentStatus:
        "Preserved by skilled artisans, facing challenges due to high production costs",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYCmh5CUxCbPefhsuT47YPNkKW_6EVrNflbA&s",
    additionalImages: [
      "https://media.licdn.com/dms/image/v2/C4E12AQEAoVEWoaJzHQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1598957874958?e=2147483647&v=beta&t=JIdZn5gv0HgJO6yMaJBLu9mLjcCQfIFooyNCei_RMbw",
      "https://mapacademy.io/wp-content/uploads/2022/04/Patan-Patola-2L.jpg",
      "https://mapacademy.io/wp-content/uploads/2022/04/Patan-Patola-3L.jpg",
    ],
  },
  "rogan-art": {
    id: "rogan-art",
    name: "Rogan Art",
    description:
      "Rogan art is a traditional craft from Gujarat, involving the use of castor oil-based paint to create intricate designs on fabric. It is one of the rarest art forms in India.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Revived through government initiatives and global recognition",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLBIGlOqsdH9Sta6UPXWlurcqcfKdIJwHUZg&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBeOLAa6NhP425_DXyuZqtz4ShgC9w3r1q0Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://cdn.shopify.com/s/files/1/0322/9623/9242/files/1_ca107a6f-487c-4cda-ab24-7e7a7822b17b.jpg?v=1603367225",
    ],
  },
  yakshagana: {
    id: "yakshagana",
    name: "Yakshagana",
    description:
      "Yakshagana is a traditional theater form from Karnataka, combining dance, music, dialogue, and elaborate costumes to depict stories from Indian epics like the Mahabharata and Ramayana.",
    history: {
      started: "12th century",
      goldenPeriod: "16th-18th century",
      currentStatus:
        "Preserved through cultural troupes and performances, especially in rural areas",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzLC-tlM5mnto1pQfvWq8rncHOgNL0QU3p6w&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv3R_JMz6lUlpSdFjxKYWMWqAsP0QV2jhk0A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtJZ0BYIWHleQ177W7TO0uVVtlxY3qSXcfNg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9WyOcYg5lgsrlgbrruFvFs6n8JXNXI89Pg&s",
    ],
  },
  "mysore-painting": {
    id: "mysore-painting",
    name: "Mysore Painting",
    description:
      "Mysore painting is a classical South Indian art form from Karnataka, known for its intricate details, vibrant colors, and use of gold foil to highlight motifs.",
    history: {
      started: "14th century under the Vijayanagara Empire",
      goldenPeriod: "16th-19th century under the Wodeyar dynasty",
      currentStatus:
        "Preserved by skilled artisans and promoted through cultural initiatives",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY6JRg2smOJRx49JaBtbbQYvTn1PWitYS8uQ&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROKaeZ-2uFNbp4t2355X-W2HvtGQPJqokPdA&s",
      "https://www.artenblu.in/wp-content/uploads/2023/06/AR-JSV-007.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpjt6wqjALGTgdLCpUdUMFxNBBoLBvjOzZLA&s",
    ],
  },
  "sandalwood-carving": {
    id: "sandalwood-carving",
    name: "Sandalwood Carving",
    description:
      "Sandalwood carving is a traditional craft from Karnataka, involving intricate carvings on sandalwood to create sculptures, boxes, and decorative items. The fragrant wood is prized for its beauty and aroma.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century under royal patronage",
      currentStatus:
        "Facing challenges due to scarcity of sandalwood but preserved through artisan communities",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-r0CSwDwj3Tn29ZlSMDY55iNw9JQ5-1YObw&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSpk_Fs5phGCXSXVxKBot_myf4DdJExB5k7w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZPUZ3bmFY5t6nm4fogr-pcWzXtmp_xi0QuA&s",
      "https://m.media-amazon.com/images/I/4151V9DM54L.jpg",
    ],
  },
  "rabindra-sangeet": {
    id: "rabindra-sangeet",
    name: "Rabindra Sangeet",
    description:
      "Rabindra Sangeet refers to the songs written and composed by Rabindranath Tagore, reflecting a wide range of themes including love, nature, spirituality, and patriotism.",
    history: {
      started: "Late 19th century",
      goldenPeriod: "Early 20th century during Rabindranath Tagore's lifetime",
      currentStatus:
        "Continues to be popular in Bengal and among Tagore enthusiasts worldwide",
    },
    image:
      "https://i.pinimg.com/736x/26/98/81/269881a9009813e4f4b107c075a3764b.jpg",
    additionalImages: [
      "https://c.saavncdn.com/169/Basanter-Rabindra-Sangeet-Bengali-2021-20210325010002-500x500.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PTohPgUqe--4E3FC6yomQ-1y1iqpcgJp7w&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNXl-PYZkPLPiP74EPR7405qv-KOsFroKhg&s",
    ],
  },
  "kalighat-paintings": {
    id: "kalighat-paintings",
    name: "Kalighat Paintings",
    description:
      "Kalighat paintings are traditional watercolor paintings from Bengal, depicting mythological themes, social issues, and everyday life with bold lines and vibrant colors.",
    history: {
      started: "19th century",
      goldenPeriod: "Mid-19th century",
      currentStatus: "Preserved through museums and contemporary artists",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsdICA-dnQHoUFENELL8K6jyW5qXwkW6khg&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHrjZyAkShsHTkWAnMeHFZA5p6uiUYYdatdA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://arts.mojarto.com/productImages/MA289529/primary/343/MA289529.jpeg",
    ],
  },
  "terracotta-temples": {
    id: "terracotta-temples",
    name: "Terracotta Temples",
    description:
      "Terracotta temples are architectural marvels found primarily in West Bengal, adorned with intricate terracotta carvings depicting mythological scenes, social life, and historical events.",
    history: {
      started: "16th century",
      goldenPeriod: "17th-19th century under Malla dynasty patronage",
      currentStatus: "Preserved as heritage sites and tourist attractions",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfo0nXvNr9UAsweTbxJsuk7rHB_jjL7Io8Q&s",
    additionalImages: [
      "https://www.memeraki.com/cdn/shop/products/panch-devi-etvadi-maata-terracotta-art-by-dinesh-molela-memerakicom-929336_800x.jpg?v=1686653744",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://m.media-amazon.com/images/I/6161Xq8UaJS._AC_UF894,1000_QL80_.jpg",
    ],
  },
  "odissi-dance": {
    id: "odissi-dance",
    name: "Odissi Dance",
    description:
      "Odissi is a classical dance form from Odisha, known for its graceful movements, intricate mudras (hand gestures), and expressions that depict stories from Hindu epics and spiritual themes.",
    history: {
      started: "2nd century BCE",
      goldenPeriod: "12th-16th century under Ganga dynasty patronage",
      currentStatus:
        "Thriving globally through performances and training institutions",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9L8yLcLvxVldaRJwqHrsTmqS__IiLf43dZA&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGhQ-jjO1MAekNNwIam-A_2PLgBKwHWlgaaA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://lotusarise.com/wp-content/uploads/2024/03/Odissi_Performance-632x1024.jpeg",
    ],
  },
  "pattachitra-paintings": {
    id: "pattachitra-paintings",
    name: "Pattachitra Paintings",
    description:
      "Pattachitra is a traditional painting style from Odisha, characterized by vibrant colors, intricate details, and mythological themes, often depicting stories from Hindu epics.",
    history: {
      started: "5th century CE",
      goldenPeriod: "12th-16th century under Ganga dynasty patronage",
      currentStatus:
        "Preserved by skilled artisans and promoted through cultural initiatives",
    },
    image:
      "https://www.artisansoul.in/cdn/shop/products/0E9A8085-PC.jpg?v=1604925056",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcydpfMrrxtrBGYdmy1M4dnLxNuQoXc5vkGA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTheUMg8qExNsNMztMOZk1D95WcuHfpQdArBA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqOg5PoEBnHlC448RA0UZfvZVha87Gn4Isg&s",
    ],
  },
  "silver-filigree": {
    id: "silver-filigree",
    name: "Silver Filigree",
    description:
      "Silver filigree is a delicate metalwork craft from Odisha, involving intricate designs made by twisting fine silver wires into patterns, often used to create jewelry and decorative items.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century under royal patronage",
      currentStatus:
        "Facing challenges due to modern alternatives but preserved by artisan communities",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFa6IPCEvx8e6WgrD_tdoMdcFcTOGG72Zvrw&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuun6vVj_5EnnBGKvJa61SLUcXiyGjD5OOfg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://static.toiimg.com/thumb/msid-108183267,width-1280,height-720,resizemode-4/108183267.jpg",
    ],
  },
  "bhangra-dance": {
    id: "bhangra-dance",
    name: "Bhangra Dance",
    description:
      "Bhangra is a lively folk dance from Punjab, traditionally performed during the harvest festival of Baisakhi. It is characterized by energetic movements, rhythmic beats, and vibrant costumes.",
    history: {
      started: "18th century",
      goldenPeriod: "19th-20th century",
      currentStatus:
        "Popular globally, especially in Punjabi communities and music festivals",
    },
    image:
      "https://www.hindustantimes.com/ht-img/img/2023/04/20/550x309/hoshiarpur-hoshiarpur-cavalcade-hindustan-youngste_1681970877065_1681970877266.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZ_e02K1czlpBYG56XwJ_p_XEIWHQmrS8WA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDjhHOUuTZgwQVWuDa_5SoNqGL9xb2qdsxxw&s",
      "https://content.jdmagicbox.com/v2/comp/hyderabad/z9/040pxx40.xx40.230510132621.y7z9/catalogue/punjabi-dhol-and-rajasthani-dhol-entertainment-group-banjara-hills-hyderabad-dhol-players-7woysfnv7t.jpg",
    ],
  },
  giddha: {
    id: "giddha",
    name: "Giddha",
    description:
      "Giddha is a traditional folk dance performed by women in Punjab, characterized by graceful movements, clapping, and singing of traditional songs called 'bolis'.",
    history: {
      started: "Ancient times",
      goldenPeriod: "19th-20th century",
      currentStatus:
        "Celebrated during weddings, festivals, and cultural events",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeE3VqtyDjPGpqlW_Iwq8BxLyvuCvnGiOXg&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdtPDNOrTk7hPmZR4NJUWg8KB2KEwewMnXw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ySKK-b-QR3DGGTC2XFS2m5c7wD1ynqeVxA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77PXkDEEzJH2Hma-LhVGKWb4z8SUfhKKCIA&s",
    ],
  },
  "phulkari-embroidery": {
    id: "phulkari-embroidery",
    name: "Phulkari Embroidery",
    description:
      "Phulkari embroidery is a traditional craft from Punjab, known for its intricate floral patterns and vibrant colors, often used to decorate shawls and garments.",
    history: {
      started: "15th century",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Preserved through cultural initiatives and modern adaptations",
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7i2AdYoeMLImn5HMfMpeO6ebEkTrX06M91A&s",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXE9uPjIf_BvqQbC6YHLFrenaBG3DitD9Ow&s",
      "https://cdn.shopify.com/s/files/1/1194/1498/files/Bagh_Phulkari_480x480.png?v=1621832612",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ImbE4Am0j3VrVmo5fUBYMaiCALjkBBFKpA&s",
    ],
  },
  "kathak-dance": {
    id: "kathak-dance",
    name: "Kathak Dance",
    description:
      "Kathak is a classical dance form from North India, known for its intricate footwork, spins, and expressive gestures. It blends storytelling with rhythmic patterns and is deeply rooted in Hindu mythology and Persian influences.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "16th-18th century under Mughal patronage",
      currentStatus:
        "Thriving globally through performances and training institutions",
    },
    image:
      "https://media.ipassio.com/media/ckeditor_image/2022/12/02/kathak-1.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8tRgz_1vhoJ5cEkE09DUhCDSXJ3BjWunpA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh1Rz9rP0w5WhOszQcjz_sCTC_RgKU0RwP1A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyki-1Wngvv51-tVvEtq1mI8JkGp_aP7DPuA&s",
    ],
  },
  "chikankari-embroidery": {
    id: "chikankari-embroidery",
    name: "Chikankari Embroidery",
    description:
      "Chikankari is a traditional embroidery art from Lucknow, Uttar Pradesh, known for its delicate white thread work on fine fabrics like muslin and silk.",
    history: {
      started: "17th century during Mughal rule",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Preserved through skilled artisans and modern adaptations in fashion",
    },
    image:
      "https://www.theheritagelab.in/wp-content/uploads/2022/06/chikanembroidery_lucknow.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAMLVK3l-oR1kO9eZq6z0D--1Je_260WW-zQ&s",
      "https://www.unnatisilks.com/cdn/shop/articles/main-image-11.jpg?v=1655293910&width=2048",
      "https://cdn.shopify.com/s/files/1/0598/4534/5450/files/CUE_THE_5_480x480.jpg?v=1644661168",
    ],
  },
  "awadhi-cuisine": {
    id: "awadhi-cuisine",
    name: "Awadhi Cuisine",
    description:
      "Awadhi cuisine is a rich and flavorful culinary tradition from Lucknow, Uttar Pradesh, known for its use of aromatic spices, slow-cooking techniques, and dishes like kebabs, biryanis, and kormas.",
    history: {
      started: "18th century during Nawabi rule",
      goldenPeriod: "19th-20th century",
      currentStatus:
        "Celebrated globally through restaurants and cultural festivals",
    },
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/02/Awadhi-food.jpg?impolicy=website&width=1600&height=900",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9IP-l8iOZaDzkJsu1lfX_0W3sc43QyBWjQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdQZsp61KtnxLJoeVROyAr9advW8KHOwTv7g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj5L3BOkZybQQfw86ntcJ6T2mJlPE29k2ozQ&s",
    ],
  },
  "chhau-dance": {
    id: "chhau-dance",
    name: "Chhau Dance",
    description:
      "Chhau is a traditional martial dance form from Eastern India, primarily performed in the states of West Bengal, Jharkhand, and Odisha. It combines elements of dance, martial arts, and storytelling, often depicting themes from epics like the Mahabharata and Ramayana.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Recognized as a UNESCO Intangible Cultural Heritage and preserved through cultural programs",
    },
    image:
      "https://www.utsavpedia.com/wp-content/uploads/2015/07/1.-httpwww.pinterest.compin406661041326847107.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHlTaXKHh7dhbTzwOl5ko7FyuZd-YGy-qeCQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_bt7_-ftoeY1r0kvTwuiUi9e3oOHCVVXxA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6zjtBApnkD4afHczK_vfJKNQZ15dOSgtaw&s",
    ],
  },
  "sohrai-paintings": {
    id: "sohrai-paintings",
    name: "Sohrai Paintings",
    description:
      "Sohrai paintings are traditional tribal art forms from Jharkhand, created by women using natural pigments on mud walls. These paintings depict animals, nature, and daily life, celebrating harvest festivals and cultural traditions.",
    history: {
      started: "Ancient times",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Preserved by tribal communities and promoted through cultural initiatives",
    },
    image:
      "https://static.wixstatic.com/media/9dd462_9259ff4a55994eadace4e709eb97a38f~mv2.jpg/v1/fill/w_980,h_672,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9dd462_9259ff4a55994eadace4e709eb97a38f~mv2.jpg",
    additionalImages: [
      "https://m.media-amazon.com/images/I/71n86sbEr0L.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmor5hWkSnxoC0ap8IF8DJV1AgHJlLtU0pAg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOt2Yg20z0jvMLT57s4GdwZtBu2Dglp_zY8Q&s",
    ],
  },
  "tribal-crafts": {
    id: "tribal-crafts",
    name: "Tribal Crafts",
    description:
      "Tribal crafts encompass a wide range of handmade items created by tribal communities across India, including jewelry, pottery, textiles, and wood carvings. These crafts reflect the unique cultural identity and traditions of each tribe.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Facing challenges but preserved through government initiatives and NGOs",
    },
    image:
      "https://3.imimg.com/data3/EK/VR/MY-5481511/tribal-handicrafts-500x500.jpg",
    additionalImages: [
      "https://5.imimg.com/data5/SELLER/Default/2025/1/480342697/PA/BW/YF/77142593/indian-handicraft-2-1654063474-500x500.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_6u9tlQSBjUAyy5h-MkJU98h8LbrNtECbcg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMOWOn5zRbsNv5_J7PPyY_v33Lsu63QD7JUQ&s",
    ],
  },
  "pandavani-folklore": {
    id: "pandavani-folklore",
    name: "Pandavani Folklore",
    description:
      "Pandavani is a traditional storytelling art form from Chhattisgarh, where stories from the Mahabharata are narrated through music, dance, and dialogue.",
    history: {
      started: "Medieval period",
      goldenPeriod: "18th-19th century",
      currentStatus: "Preserved through cultural troupes and festivals",
    },
    image:
      "https://www.theartlifegallery.com/blog/wp-content/uploads/2023/07/Image-01-15.jpg",
    additionalImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Teejan_Bai_performing_at_Bharat_Bhawan_Bhopal_%282%29.jpg/640px-Teejan_Bai_performing_at_Bharat_Bhawan_Bhopal_%282%29.jpg",
      "https://mapacademy.io/wp-content/uploads/2023/04/pandvani-2m.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrq5mn7ymsbY7V1xPhDRZd5zcG8D1ppB6uw&s",
    ],
  },
  "bastar-art": {
    id: "bastar-art",
    name: "Bastar Art",
    description:
      "Bastar Art refers to the traditional metal crafts and wooden sculptures made by tribal communities in Chhattisgarh, known for their intricate designs and depictions of nature and deities.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Preserved by tribal artisans and promoted through cultural initiatives",
    },
    image:
      "https://www.artsindia.com/cdn/shop/articles/Bastar_Art.png?v=1678938079",
    additionalImages: [
      "https://bastararts.com/cdn/shop/products/BT007d_1024x1024@2x.jpg?v=1627115093",
      "https://m.media-amazon.com/images/I/71AS63llJbL.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QbVt_TD0urJMMSTfT0ydM0OizbMwknSeDQ&s",
    ],
  },
  "tribal-dances": {
    id: "tribal-dances",
    name: "Tribal Dances",
    description:
      "Tribal dances are vibrant performances by indigenous communities across India, showcasing their unique cultural identity through rhythmic movements, costumes, and music.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Celebrated during festivals and preserved through cultural programs",
    },
    image:
      "https://images.moneycontrol.com/static-mcnews/2021/10/The-second-edition-of-the-National-Tribal-Dance-Festival-in-Raipur-Chhattisgarh-which-concludes-today-has-brought-together-performers-from-India-and-abroad..jpg?impolicy=website&width=1600&height=900",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0gHX0TFkByyDFaFJqljgp7d2pQoDK5NBVA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbzyEE36c2BQdEKNzVtWHiQZ4zTBmYL6A2Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3KwrLlkZMUDmVKI-exZRYbae_9iWy_NmpCw&s",
    ],
  },
  "manipuri-dance": {
    id: "manipuri-dance",
    name: "Manipuri Dance",
    description:
      "Manipuri dance is a classical dance form from Manipur, known for its graceful movements, devotional themes, and depiction of stories from Hindu mythology, particularly those related to Radha and Krishna.",
    history: {
      started: "11th century",
      goldenPeriod: "17th-19th century under royal patronage",
      currentStatus:
        "Thriving globally through performances and training institutions",
    },
    image:
      "https://serenademagazine.com/content/images/wp-content/uploads/2024/01/rasa_lila_in_manipuri_dance_style.jpg",
    additionalImages: [
      "https://www.insightsonindia.com/wp-content/uploads/2021/08/Manipuri-Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6czLbqg29jahi0OcfBIKVqZmZvAJbX3x03w&s",
      "https://discoveryofbharat.com/wp-content/uploads/2025/03/Manipuri-Dance.jpg",
    ],
  },
  "thang-ta-martial-art": {
    id: "thang-ta-martial-art",
    name: "Thang-Ta Martial Art",
    description:
      "Thang-Ta is a traditional martial art from Manipur, combining combat techniques with rituals and performances. It involves the use of swords (Thang) and spears (Ta) and reflects the warrior culture of the Meitei community.",
    history: {
      started: "15th century",
      goldenPeriod: "17th-19th century during the reign of the Meitei kings",
      currentStatus:
        "Preserved through cultural festivals and martial arts schools",
    },
    image:
      "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/12/21/Pictures/_72928a7c-433c-11eb-821f-5ee837a10748.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZq7I4yDvmQNHa3fR7Xe795172uWp2rfZKw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRFJBKvTvOY3wdKAsRi3z3c8k88D7ya1NDGg&s",
      "https://www.iasgyan.in//ig-uploads/images//image01444.jpg",
    ],
  },
  pottery: {
    id: "pottery",
    name: "Pottery",
    description:
      "Pottery is an ancient craft practiced across India, involving the creation of functional and decorative items using clay. Each region has its unique style, such as terracotta pottery in West Bengal and black pottery in Manipur.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Still widely practiced but facing challenges from modern alternatives",
    },
    image:
      "https://artincontext.org/wp-content/uploads/2023/05/History-of-Pottery.jpg",
    additionalImages: [
      "https://decodemalayalam.com/wp-content/uploads/2024/07/3-4-1024x576.jpg",
      "https://poothali.com/wp-content/uploads/2023/08/Traditional-Pottery-in-Erikkulam.jpg",
      "https://images.indianexpress.com/2019/11/pottery759.jpeg",
    ],
  },
  "jat-jatin-dance": {
    id: "jat-jatin-dance",
    name: "Jat-Jatin Dance",
    description:
      "Jat-Jatin is a traditional folk dance from Bihar, performed by women to depict the daily lives, struggles, and joys of rural communities. It often involves storytelling through rhythmic movements and songs.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus: "Preserved through local festivals and cultural programs",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jat_Jatni_Bihar.jpg/1024px-Jat_Jatni_Bihar.jpg",
    additionalImages: [
      "https://cdn-images.prepp.in/public/image/fb2e608f76909eb9b19c18b11a8bd739.jpeg?tr=w-512,h-312,c-force",
      "https://www.indianetzone.com/public/admin/uploadImage/1_Jai_Jatin_Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIURLEEPGvbAiyiuoXmYbDKx2FJ2znExaMqw&s",
    ],
  },
  "madhubani-paintings": {
    id: "madhubani-paintings",
    name: "Madhubani Paintings",
    description:
      "Madhubani paintings are traditional artworks from Bihar, known for their vibrant colors, intricate patterns, and depictions of nature, mythology, and social themes.",
    history: {
      started: "7th century BCE",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Thriving globally through exhibitions and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Madhubani_Mahavidyas.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmI-CyQXFWljO-qUCgFL2qAMnZoXE8qoAjeA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpvoeCw-7iU0cPzL4H1i0Dm6Coi9h-b5DCgg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Z8ETIY_6Rjigqr3H6m5rZuwP-VGRYdQ1yw&s",
    ],
  },
  "sujni-embroidery": {
    id: "sujni-embroidery",
    name: "Sujni Embroidery",
    description:
      "Sujni embroidery is a traditional craft from Bihar, involving intricate stitching on fabric to create quilts, garments, and decorative items, often depicting rural life and folklore.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Preserved through skilled artisans and cultural initiatives",
    },
    image: "https://static.toiimg.com/photo/105420777.cms",
    additionalImages: [
      "https://static.toiimg.com/thumb/imgsize-241620,msid-105420773/105420773.jpg?width=500&resizemode=4",
      "https://static.toiimg.com/thumb/imgsize-121088,msid-105420770/105420770.jpg?width=500&resizemode=4",
      "https://cdn.shopify.com/s/files/1/0155/8131/files/Sujani_Pinterest_Cali_Bessa_480x480.jpg?v=1698474283",
    ],
  },
  "gond-art": {
    id: "gond-art",
    name: "Gond Art",
    description:
      "Gond Art is a traditional tribal art form from Madhya Pradesh, characterized by intricate patterns, vibrant colors, and depictions of nature, animals, and deities.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Preserved through tribal communities and promoted through modern adaptations",
    },
    image:
      "https://cdn.shopify.com/s/files/1/1194/1498/files/badadev_480x480.jpg?v=1611036299",
    additionalImages: [
      "https://www.artzolo.com/cdn/shop/articles/gond-the-tribal-art-of-the-heart-of-india-artzolo-com.jpg?v=1721136941",
      "https://dastkarihaat.com/cdn/shop/products/DIP18.jpg?v=1629445352",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1EAFY1DDIjVr4xOt0IvouGcI2fsiiD7miQ&s",
    ],
  },
  " kathak-dance": {
    id: "kathak-dance",
    name: "Kathak Dance",
    description:
      "Kathak is a classical dance form from North India, known for its intricate footwork, spins, and expressive gestures. It blends storytelling with rhythmic patterns and is deeply rooted in Hindu mythology and Persian influences.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "16th-18th century under Mughal patronage",
      currentStatus:
        "Thriving globally through performances and training institutions",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Kathak_Dance.jpg/800px-Kathak_Dance.jpg",
    additionalImages: [
      "https://www.culturalindia.net/iliimages/Kathak-1-1600.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY6Uv5sJt9ZmR4xW5eLpjljKSm2F8h6O_hA&s",
      "https://www.soulveda.com/wp-content/uploads/2023/09/kathak-dance-form-of-india.jpg",
    ],
  },
  "mandu-festival": {
    id: "mandu-festival",
    name: "Mandu Festival",
    description:
      "The Mandu Festival is an annual cultural event held in Mandu, Madhya Pradesh, celebrating the region's rich heritage through music, dance, art, and historical reenactments.",
    history: {
      started: "2014 (modern revival)",
      goldenPeriod: "Medieval period during the reign of the Malwa Sultanate",
      currentStatus: "A major tourist attraction and cultural celebration",
    },
    image:
      "https://memorableindia.com/wp-content/uploads/2020/05/mandu-festival-mp.jpg",
    additionalImages: [
      "https://www.newsbharati.com/Encyc/2019/12/28/2_01_16_34_560_1_H@@IGHT_393_W@@IDTH_600.jpg",
      "https://traveltradejournal.com/wp-content/uploads/2022/12/Mandu-Festival.jpg",
      "https://mpholidays.com/wp-content/uploads/2023/01/Mandu-Utsav.jpg",
    ],
  },
  "lavani-dance": {
    id: "lavani-dance",
    name: "Lavani Dance",
    description:
      "Lavani is a traditional folk dance from Maharashtra, known for its energetic performances, rhythmic music, and vibrant costumes. It often conveys themes of love, heroism, and social issues.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century during the Peshwa rule",
      currentStatus: "Popular at cultural festivals and celebrations",
    },
    image:
      "https://www.auchitya.com/wp-content/uploads/2021/04/lavani-dance.jpg",
    additionalImages: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvOnjGerOpRqM2WoYc0Lnj_I8wOs64Y1lyaa-BqjsNV9GA-efe60u9QmFaEvz-_DzAMkkrQIxNWkLHNPF-S5EhtbYvDSOn2Dn-1WT50QUceO3B2SJBG5CZyhLZ2TzxMsC90GQSu2bByeg/s400/front+lavani+2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://th-i.thgim.com/public/entertainment/theatre/z7xnlq/article26071334.ece/alternates/FREE_1200/Ambika-Akshay-Malvankar-Anand-Satam-Akanksha-Kadam",
    ],
  },
  "warli-paintings": {
    id: "warli-paintings",
    name: "Warli Paintings",
    description:
      "Warli paintings are traditional tribal artworks from Maharashtra, characterized by simple geometric shapes, monochromatic designs, and depictions of daily life, nature, and rituals.",
    history: {
      started: "Ancient times (2500 BCE)",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Thriving globally through exhibitions and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Warli_Painting.jpg/800px-Warli_Painting.jpg",
    additionalImages: [
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Warli-Art.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDQwVYbXoMqyZl4u-BgY3EiSOD1CQ7aLMkg&s",
      "https://www.craftsvilla.com/blog/wp-content/uploads/2018/06/Warli-Paintings.jpg",
    ],
  },
  "ganesh-chaturthi": {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    description:
      "Ganesh Chaturthi is a vibrant festival celebrated across India, particularly in Maharashtra, to honor the birth of Lord Ganesha. It involves elaborate rituals, processions, and immersion ceremonies.",
    history: {
      started: "Ancient times",
      goldenPeriod: "19th century under Bal Gangadhar Tilak's revival",
      currentStatus:
        "A major cultural and religious celebration, attracting millions of devotees",
    },
    image:
      "https://incenseomega.com/cdn/shop/articles/omega-blog23-Ganesha-Chaturthi-A-Festival-of-Prosperity-and-Blessings.webp?v=1707205641",
    additionalImages: [
      "https://i.pinimg.com/736x/f6/6c/bc/f66cbc1c020da8dffe928f4c301eba05.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1510416710/display_1500/stock-photo-mumbai-india-september-thousands-of-devotees-bid-adieu-to-tallest-lord-ganesha-with-1510416710.jpg",
      "https://c.ndtvimg.com/2024-09/17mgh5d_ganesh-chaturthi-ani_625x300_07_September_24.jpeg",
    ],
  },
  "naga-dance": {
    id: "naga-dance",
    name: "Naga Dance",
    description:
      "Naga Dance is a traditional folk dance performed by the Naga tribes of Nagaland, characterized by energetic movements, rhythmic drumming, and vibrant traditional attire. It is often performed during festivals and celebrations.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Pre-colonial era",
      currentStatus:
        "Preserved through cultural festivals like Hornbill Festival",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Naga_Dance.jpg/800px-Naga_Dance.jpg",
    additionalImages: [
      "https://www.nagalandtourism.in/sites/default/files/styles/large/public/2023-05/Naga-Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Naga-Dance.jpg",
    ],
  },
  " bamboo- craft": {
    id: "bamboo-craft",
    name: "Bamboo Craft",
    description:
      "Bamboo craft is a traditional art form practiced across India, particularly in the Northeast, involving the creation of functional and decorative items such as baskets, mats, and furniture using bamboo.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bamboo_Craft.jpg/800px-Bamboo_Craft.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Bamboo-Craft-India.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/bamboo-craft-india.jpg",
    ],
  },
  tattooing: {
    id: "tattooing",
    name: "Tattooing",
    description:
      "Tattooing is a traditional art form practiced by various tribal communities in India, particularly in the Northeast and Central India, using natural dyes and tools to create symbolic designs on the skin.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Pre-colonial era",
      currentStatus:
        "Preserved through tribal traditions and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tribal_Tattooing.jpg/800px-Tribal_Tattooing.jpg",
    additionalImages: [
      "https://www.indianmirror.com/culture/tattooing/tattooing.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2019/03/Tribal-Tattooing.jpg",
    ],
  },
  "mask-dance": {
    id: "mask-dance",
    name: "Mask Dance",
    description:
      "Mask Dance is a traditional performance art from the Himalayan regions, particularly in Sikkim, Ladakh, and Arunachal Pradesh. It involves dancers wearing elaborate masks and costumes to depict religious stories, mythological tales, and cultural themes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century under Buddhist monastic patronage",
      currentStatus: "Preserved through monasteries and cultural festivals",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mask_Dance_Ladakh.jpg/800px-Mask_Dance_Ladakh.jpg",
    additionalImages: [
      "https://www.sikkimtourism.gov.in/sites/default/files/styles/large/public/2023-05/Mask-Dance-Sikkim.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.tourmyindia.com/states/sikkim/image/mask-dance.jpg",
    ],
  },
  " thangka -paintings": {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    description:
      "Thangka paintings are traditional Tibetan Buddhist scroll paintings, depicting deities, mandalas, and religious narratives. These artworks are used as teaching tools and for meditation purposes.",
    history: {
      started: "7th century CE",
      goldenPeriod: "11th-15th century",
      currentStatus: "Preserved by monasteries and artisans",
    },
    image:
      "https://v.greattibettour.com/photos/201904/tibetan-thangka--44339.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdWBzsM75fK9MK-DFkdM5a5v_S0y-T5SnWg&s",
      "https://i1.himalayas.life/c/u/f67894297b6134a6b759b3a9ec15b6cb/2018/04/26054954/26-e1522558104714.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVX92htoKwCc4tDToVkM1jB4uN3Fym2-8zAA&s",
    ],
  },
  "tibetan-carpets": {
    id: "tibetan-carpets",
    name: "Tibetan Carpets",
    description:
      "Tibetan carpets are handwoven textiles from the Himalayan regions, known for their intricate designs, vibrant colors, and durability. These carpets often feature geometric patterns, floral motifs, and symbolic imagery.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century under Buddhist and royal patronage",
      currentStatus: "Preserved through artisan communities and global demand",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tibetan_Carpet.jpg/800px-Tibetan_Carpet.jpg",
    additionalImages: [
      "https://www.tibettravel.org/wp-content/uploads/2019/03/Tibetan-Carpets.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/06/Tibetan-Carpets.jpg",
    ],
  },
  "hojagiri-dance": {
    id: "hojagiri-dance",
    name: "Hojagiri Dance",
    description:
      "Hojagiri is a traditional folk dance performed by the Reang (Bru) tribal community of Tripura. It is characterized by graceful movements, balancing acts, and vibrant costumes, often performed during festivals and celebrations.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Preserved through tribal communities and cultural festivals",
    },
    image: "https://tripuratimes.com/ImagesForAll/Hojagiri%2010.jpg",
    additionalImages: [
      "https://historified.in/wp-content/uploads/2025/02/E223O3SWYAEPZGK.jpeg",
      "https://cdn.magzter.com/1342538148/1664271584/articles/-7fIkw4xI1664801540078/HOJAGIRI-DANCE-STATES-MOST-ACCLAIMED-DANCE-FORM.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__AdGUFkyycOkWiaAvGAeKmmS3YK-Fl3_9w&s",
    ],
  },
  " bamboo -craft": {
    id: "bamboo-craft",
    name: "Bamboo Craft",
    description:
      "Bamboo craft is a traditional art form practiced across India, particularly in the Northeast, involving the creation of functional and decorative items such as baskets, mats, and furniture using bamboo.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bamboo_Craft.jpg/800px-Bamboo_Craft.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Bamboo-Craft-India.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/bamboo-craft-india.jpg",
    ],
  },
  "paitkar-paintings": {
    id: "paitkar-paintings",
    name: "Paitkar Paintings",
    description:
      "Paitkar paintings are traditional scroll paintings from Jharkhand, created by the Paitkar tribe. These artworks depict mythological themes, social life, and rituals, often used for storytelling and religious purposes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Facing challenges but preserved through cultural initiatives",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Paitkar_Painting.jpg/800px-Paitkar_Painting.jpg",
    additionalImages: [
      "https://www.jharkhandtourism.in/images/paitkar-painting.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDQwVYbXoMqyZl4u-BgY3EiSOD1CQ7aLMkg&s",
      "https://www.thebetterindia.com/wp-content/uploads/2020/11/Paitkar-Painting.jpg",
    ],
  },
  "nongkrem-dance": {
    id: "nongkrem-dance",
    name: "Nongkrem Dance",
    description:
      "Nongkrem Dance is a traditional harvest festival dance performed by the Khasi tribe of Meghalaya. It involves rhythmic movements, vibrant costumes, and rituals to honor ancestors and seek blessings for a bountiful harvest.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Pre-colonial era",
      currentStatus:
        "Preserved through cultural festivals like Nongkrem Festival",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Nongkrem_Dance.jpg/800px-Nongkrem_Dance.jpg",
    additionalImages: [
      "https://www.meghalayatourism.in/sites/default/files/styles/large/public/2023-05/Nongkrem-Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Nongkrem-Dance.jpg",
    ],
  },
  "wood-carving": {
    id: "wood-carving",
    name: "Wood Carving",
    description:
      "Wood carving is a traditional craft practiced across India, particularly in the Northeast, involving intricate designs on wooden artifacts such as doors, panels, and sculptures, often depicting nature, deities, and cultural motifs.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus: "Thriving through skilled artisans and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wood_Carving.jpg/800px-Wood_Carving.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Wood-Carving.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/wood-carving-india.jpg",
    ],
  },
  "jaintia-architecture": {
    id: "jaintia-architecture",
    name: "Jaintia Architecture",
    description:
      "Jaintia architecture refers to the traditional architectural style of the Jaintia Hills in Meghalaya, characterized by stone structures, monolithic pillars, and unique designs that reflect the region's cultural heritage.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century during the Jaintia Kingdom",
      currentStatus:
        "Preserved through historical sites and cultural initiatives",
    },
    image:
      "https://i0.wp.com/lifeisavacation.in/wp-content/uploads/2017/03/Nartiang-Durga-TempleView.jpg?resize=700%2C469",
    additionalImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/DG_150_-_11IRABOTI_PANTHOSALA_116.jpg/640px-DG_150_-_11IRABOTI_PANTHOSALA_116.jpg",
      "https://static2.tripoto.com/media/filter/tst/img/2005122/TripDocument/1603454751_2017_12_25_3_02.jpeg.webp",
      "https://im.hunt.in/cg/meg/About/Tourism/orchidinn.jpg",
    ],
  },
  "dollu-kunitha-dance": {
    id: "dollu-kunitha-dance",
    name: "Dollu Kunitha Dance",
    description:
      "Dollu Kunitha is a traditional drum dance from Karnataka, performed by the Kuruba community. It involves energetic movements and rhythmic drumming, often accompanied by devotional songs.",
    history: {
      started: "Ancient times",
      goldenPeriod: "12th-16th century under the Vijayanagara Empire",
      currentStatus: "Preserved through cultural troupes and festivals",
    },
    image:
      "https://www.amarchitrakatha.com/wp-content/uploads/2023/05/Dollu-Kunitha-_inarticle.jpg",
    additionalImages: [
      "https://indianetzone.wordpress.com/wp-content/uploads/2023/05/feat.jpg",
      "https://karnatakatourism.org/wp-content/uploads/2020/06/DOLLU-KUNITHA.jpg",
      "https://www.nrityashiksha.com/wp-content/uploads/2022/11/Dollu-kunitha-dance-scaled.webp",
    ],
  },
  bidriware: {
    id: "bidriware",
    name: "Bidriware",
    description:
      "Bidriware is a traditional metal handicraft from Karnataka, known for its intricate designs and use of silver inlay on blackened alloy. It includes items like vases, boxes, and utensils.",
    history: {
      started: "14th century",
      goldenPeriod: "16th-18th century under the Bahmani Sultanate",
      currentStatus:
        "Preserved through skilled artisans and recognized as a Geographical Indication (GI)",
    },
    image:
      "https://static.toiimg.com/photo/imgsize-866766,msid-68102322/68102322.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdlSuJZ3BJJa_84WKQlz-T2POtkYbsTQmKA&s",
      "https://d35l77wxi0xou3.cloudfront.net/collab/craft1582795978Bidri-Banner.jpg",
      "https://s7ap1.scene7.com/is/image/incredibleindia/bidriware-bidar-karnataka-craft-hero?qlt=82&ts=1726641338177",
    ],
  },
  "cheriyal-scroll-paintings": {
    id: "cheriyal-scroll-paintings",
    name: "Cheriyal Scroll Paintings",
    description:
      "Cheriyal Scroll Paintings are traditional artworks from Telangana, created using natural dyes on handcrafted cloth. They depict mythological stories and rural life in vibrant colors.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Preserved through government initiatives and modern adaptations",
    },
    image:
      "https://mapacademy.io/wp-content/uploads/2023/04/cheriyal-scroll-painting-9l.jpg",
    additionalImages: [
      "https://lh3.googleusercontent.com/ci/AL18g_TxksSCcq0Y7pdHmdtTLNVJWlKCETXHs0SbsFc7H2tA-K21KNn1sHbEsiSTf04dKTEHGeFUw9A=s1200",
      "https://assets.thehansindia.com/h-upload/2020/05/24/971670-handcraft-art.jpg",
      "https://media.assettype.com/tnm%2Fimport%2Fsites%2Fall%2Fvar%2Fwww%2Fimages%2Fscroll.jpg",
    ],
  },
  "chholiya-dance": {
    id: "chholiya-dance",
    name: "Chholiya Dance",
    description:
      "Chholiya is a traditional martial dance from Uttarakhand, performed during weddings and festivals. It involves energetic movements, swordplay, and vibrant traditional attire.",
    history: {
      started: "Medieval period",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Preserved through cultural festivals and local celebrations",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Cholliyar.jpg",
    additionalImages: [
      "https://www.sdcuk.in/wp-content/uploads/2024/04/e1ac5c8b4cda9d7662d88dc479c74b33-2.jpg",
      "https://www.gosahin.com/go/p/e/t/1541270727_Chholiya-Dance-Form5.jpg",
      "https://thumbs.dreamstime.com/b/kumauni-chholiya-choliya-dancer-performing-indian-wedding-folk-dance-uttarakhand-211735728.jpg",
    ],
  },
  "aipan-art": {
    id: "aipan-art",
    name: "Aipan Art",
    description:
      "Aipan is a traditional folk art from Uttarakhand, created using rice paste on red clay backgrounds. It features intricate geometric patterns and motifs, often used for rituals and decorations during festivals.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Preserved through rural households and cultural initiatives",
    },
    image:
      "https://itokri.com/cdn/shop/articles/apain_1_1500x_85500b37-7536-4d99-b6b5-0ebf2e78afa6.jpg?v=1738140606",
    additionalImages: [
      "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/120612/246925/1682628629117_IMG_20220630_093724__20801.1686996467.jpg?c=2",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1siYzlJAkXZYfmbhtld7VD-kGHCeA9IHWA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqZ1wa9J8mqpkO6lJ23H6nYH2nM-NwFCLNAg&s",
    ],
  },
  " wood-carving": {
    id: "wood-carving",
    name: "Wood Carving",
    description:
      "Wood carving is a traditional craft practiced across India, particularly in Uttarakhand, involving intricate designs on wooden artifacts such as doors, panels, and sculptures, often depicting nature, deities, and cultural motifs.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus: "Thriving through skilled artisans and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wood_Carving.jpg/800px-Wood_Carving.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Wood-Carving.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/wood-carving-india.jpg",
    ],
  },
  "swang-dance": {
    id: "swang-dance",
    name: "Swang Dance",
    description:
      "Swang is a traditional folk dance-drama from Haryana and Rajasthan, combining music, dance, and dialogue to narrate mythological and social stories.",
    history: {
      started: "17th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Preserved through cultural troupes and festivals",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Swang_Dance.jpg/800px-Swang_Dance.jpg",
    additionalImages: [
      "https://www.haryanatourism.gov.in/sites/default/files/styles/large/public/2023-05/Swang-Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Swang-Dance.jpg",
    ],
  },
  " phulkari-embroidery": {
    id: "phulkari-embroidery",
    name: "Phulkari Embroidery",
    description:
      "Phulkari embroidery is a traditional craft from Punjab, known for its intricate floral patterns and vibrant colors, often used to decorate shawls and garments.",
    history: {
      started: "15th century",
      goldenPeriod: "18th-19th century",
      currentStatus:
        "Preserved through cultural initiatives and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Phulkari_embroidery.jpg/800px-Phulkari_embroidery.jpg",
    additionalImages: [
      "https://www.punjabtourism.gov.in/images/phulkari-embroidery.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDQwVYbXoMqyZl4u-BgY3EiSOD1CQ7aLMkg&s",
      "https://www.craftsvilla.com/blog/wp-content/uploads/2018/06/Phulkari-Embroidery.jpg",
    ],
  },
  "folk-songs": {
    id: "folk-songs",
    name: "Folk Songs",
    description:
      "Folk songs are traditional musical compositions passed down through generations, reflecting the culture, emotions, and daily life of rural communities across India.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus: "Preserved through oral traditions and cultural programs",
    },
    image: "https://www.india-a2z.com/images/folkmusic.png",
    additionalImages: [
      "https://magikindia.com/wp-content/uploads/2015/04/sufi-festival-jodhpur-3.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://en-media.thebetterindia.com/uploads/2011/09/dekulture2.jpeg",
    ],
  },
  "cheraw-dance": {
    id: "cheraw-dance",
    name: "Cheraw Dance",
    description:
      "Cheraw Dance is a traditional bamboo dance from Mizoram, performed by women stepping in and out of crossed bamboo poles while men rhythmically clap the poles together. It symbolizes joy, celebration, and Mizoram's cultural heritage.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Pre-colonial era",
      currentStatus:
        "Preserved through festivals like Chapchar Kut and cultural programs",
    },
    image:
      "https://cdn-images.prepp.in/public/image/7ba6aebdd6145e5fdb29b9d2bb91d6f4.png?tr=w-512,h-340,c-force",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiGBK0ftgDfu9D18F_DRH765YlU_WVHT51Pg&s",
      "https://www.auchitya.com/wp-content/uploads/2021/01/cheraw-dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlBntt58b8vEAmMlYVe3djsLATgXGO3_8-fg&s",
    ],
  },
  "bamboo -craft": {
    id: "bamboo-craft",
    name: "Bamboo Craft",
    description:
      "Bamboo craft is a traditional art form practiced across India, particularly in the Northeast, involving the creation of functional and decorative items such as baskets, mats, and furniture using bamboo.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bamboo_Craft.jpg/800px-Bamboo_Craft.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Bamboo-Craft-India.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/bamboo-craft-india.jpg",
    ],
  },
  "puan-clothing": {
    id: "puan-clothing",
    name: "Puan Clothing",
    description:
      "Puan is a traditional handwoven cloth from Mizoram, worn as a wrap-around garment by both men and women. It features vibrant colors and intricate designs, symbolizing Mizoram's rich cultural identity.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century",
      currentStatus:
        "Preserved through cultural traditions and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Puan_Clothing.jpg/800px-Puan_Clothing.jpg",
    additionalImages: [
      "https://www.mizoram.nic.in/sites/default/files/styles/large/public/2023-05/Puan-Clothing.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Puan-Clothing.jpg",
    ],
  },
  "nicobarese-dance": {
    id: "nicobarese-dance",
    name: "Nicobarese Dance",
    description:
      "Nicobarese Dance is a traditional folk dance performed by the Nicobari tribe of the Andaman and Nicobar Islands. It is an integral part of their cultural celebrations, often performed during festivals and ceremonies.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Pre-colonial era",
      currentStatus:
        "Preserved through tribal communities and cultural initiatives",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nicobarese_Dance.jpg/800px-Nicobarese_Dance.jpg",
    additionalImages: [
      "https://www.andamantourism.in/sites/default/files/styles/large/public/2023-05/Nicobarese-Dance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Nicobarese-Dance.jpg",
    ],
  },
  " tribal-crafts": {
    id: "tribal-crafts",
    name: "Tribal Crafts",
    description:
      "Tribal crafts encompass a wide range of handmade items created by indigenous communities across India, including jewelry, pottery, textiles, and wood carvings. These crafts reflect the unique cultural identity and traditions of each tribe.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Facing challenges but preserved through government initiatives and NGOs",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tribal_Crafts.jpg/800px-Tribal_Crafts.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2018/06/Tribal-Crafts.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://www.indianmirror.com/culture/tribal-crafts/tribal-crafts.jpg",
    ],
  },
  "modern-art": {
    id: "modern-art",
    name: "Modern Art",
    description:
      "Modern Art refers to artistic works produced during the period extending roughly from the late 19th century to the mid-20th century, characterized by experimentation, abstraction, and a departure from traditional forms.",
    history: {
      started: "Late 19th century",
      goldenPeriod: "Early to mid-20th century",
      currentStatus:
        "Celebrated globally through galleries, museums, and contemporary adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Modern_Art.jpg/800px-Modern_Art.jpg",
    additionalImages: [
      "https://www.theartstory.org/images/movements/modern-art/modern-art-examples.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.tate.org.uk/art/art-terms/m/modern-art.jpg",
    ],
  },
  "rock-garden-sculptures": {
    id: "rock-garden-sculptures",
    name: "Rock Garden Sculptures",
    description:
      "The Rock Garden of Chandigarh is a unique art installation featuring sculptures and structures made from recycled materials such as broken ceramics, tiles, and industrial waste, created by artist Nek Chand.",
    history: {
      started: "1950s",
      goldenPeriod: "1970s-1980s",
      currentStatus:
        "A major tourist attraction and UNESCO-endorsed heritage site",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Rock_Garden_Chandigarh.jpg/800px-Rock_Garden_Chandigarh.jpg",
    additionalImages: [
      "https://www.chandigarhtourism.gov.in/sites/default/files/styles/large/public/2023-05/Rock-Garden-Chandigarh.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://www.indianholiday.com/blog/wp-content/uploads/2018/04/Rock-Garden-Chandigarh.jpg",
    ],
  },
  "tribal-dance": {
    id: "tribal-dance",
    name: "Tribal Dance",
    description:
      "Tribal dances are vibrant performances by indigenous communities across India, showcasing their unique cultural identity through rhythmic movements, costumes, and music.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Celebrated during festivals and preserved through cultural programs",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Tribal_Dance.jpg/800px-Tribal_Dance.jpg",
    additionalImages: [
      "https://www.indianmirror.com/culture/tribal-dances/tribal-dances.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Tribal-Dance.jpg",
    ],
  },
  "bamboo-crafts": {
    id: "bamboo-crafts",
    name: "Bamboo Crafts",
    description:
      "Bamboo crafts are traditional handmade items created using bamboo, including baskets, mats, furniture, and decorative artifacts. These crafts reflect the sustainable practices and creativity of artisans across India.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://boldnewsonline.com/wp-content/uploads/2022/02/bamboo-craft.jpg",
    additionalImages: [
      "https://www.craftsvilla.com/blog/wp-content/uploads/2019/06/Bamboo-Crafts.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4pYkz4vQ5y5S6Z4R3P_5lZnWZJ9hVQ7y5A&s",
      "https://www.thebetterindia.com/wp-content/uploads/2021/08/bamboo-craft-india.jpg",
    ],
  },
  "folk-dance": {
    id: "folk-dance",
    name: "Folk Dance",
    description:
      "Folk dances are traditional dances performed by rural communities across India, reflecting their cultural heritage, daily life, and celebrations through rhythmic movements and vibrant costumes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus: "Preserved through local festivals and cultural programs",
    },
    image:
      "https://kaziranganationalparkassam.in/wp-content/uploads/2019/01/Traditional-Bodo-Dance_Bagrumba_3.jpg",
    additionalImages: [
      "https://www.namasteindiatrip.org/wp-content/uploads/2022/10/Karma-Dance.jpg",
      "https://www.namasteindiatrip.org/wp-content/uploads/2022/10/Jawara-Dance.jpg",
      "https://madhyapradesh.pscnotes.com/wp-content/uploads/2017/10/download-1-300x168.jpg",
    ],
  },
  " pottery": {
    id: "pottery",
    name: "Pottery",
    description:
      "Pottery is an ancient craft practiced across India, involving the creation of functional and decorative items using clay. Each region has its unique style, such as terracotta pottery in West Bengal and black pottery in Manipur.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Still widely practiced but facing challenges from modern alternatives",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Traditional_Pottery.jpg/800px-Traditional_Pottery.jpg",
    additionalImages: [
      "https://decodemalayalam.com/wp-content/uploads/2024/07/3-4-1024x576.jpg",
      "https://poothali.com/wp-content/uploads/2023/08/Traditional-Pottery-in-Erikkulam.jpg",
      "https://images.indianexpress.com/2019/11/pottery759.jpeg",
    ],
  },
  "classical-music": {
    id: "classical-music",
    name: "Classical Music",
    description:
      "Classical music in India encompasses two major traditions: Hindustani (North Indian) and Carnatic (South Indian). It is characterized by intricate ragas (melodic frameworks) and talas (rhythmic cycles), performed through vocal and instrumental renditions.",
    history: {
      started: "Vedic period (1500 BCE)",
      goldenPeriod: "Medieval period (12th-18th century)",
      currentStatus:
        "Thriving globally through concerts, education, and modern adaptations",
    },
    image:
      "https://31stannual.org/wp-content/uploads/2023/08/classical-indian-music.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmoU3rHGal8qVv8EyT-IS_6ge6t5o7a_sPzCHw7bsSTW2PRuaFCEOKkZHzqxTaA_piyUU&usqp=CAU",
      "https://images.unsplash.com/photo-1681731030357-829645dd55b1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwY2xhc3NpY2FsJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D",
      "https://i.filecdn.in/755esias/image-1680779222356.png",
    ],
  },
  "kathak- dance": {
    id: "kathak-dance",
    name: "Kathak Dance",
    description:
      "Kathak is a classical dance form from North India, known for its intricate footwork, spins, and expressive gestures. It blends storytelling with rhythmic patterns and is deeply rooted in Hindu mythology and Persian influences.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "16th-18th century under Mughal patronage",
      currentStatus:
        "Thriving globally through performances and training institutions",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Kathak_Dance.jpg/800px-Kathak_Dance.jpg",
    additionalImages: [
      "https://www.culturalindia.net/iliimages/Kathak-1-1600.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY6Uv5sJt9ZmR4xW5eLpjljKSm2F8h6O_hA&s",
      "https://www.soulveda.com/wp-content/uploads/2023/09/kathak-dance-form-of-india.jpg",
    ],
  },
  "kashmiri-music": {
    id: "kashmiri-music",
    name: "Kashmiri Music",
    description:
      "Kashmiri music is a traditional form of music from the Kashmir Valley, characterized by soulful melodies, Sufi influences, and instruments like the santoor and rabab. It often reflects themes of love, nature, and spirituality.",
    history: {
      started: "Ancient times",
      goldenPeriod:
        "14th-16th century under the patronage of Sultan Zain-ul-Abidin",
      currentStatus:
        "Preserved through cultural programs and modern adaptations",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kashmiri_Music.jpg/800px-Kashmiri_Music.jpg",
    additionalImages: [
      "https://www.kashmirtourism.gov.in/sites/default/files/styles/large/public/2023-05/Kashmiri-Music.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Kashmiri-Music.jpg",
    ],
  },
  "pashmina-shawls": {
    id: "pashmina-shawls",
    name: "Pashmina Shawls",
    description:
      "Pashmina shawls are luxurious handwoven textiles made from the fine wool of Changthangi goats found in Ladakh. Known for their softness and intricate embroidery, they are a symbol of elegance and craftsmanship.",
    history: {
      started: "15th century",
      goldenPeriod: "16th-19th century during Mughal rule",
      currentStatus:
        "Highly valued globally and recognized as a Geographical Indication (GI) product",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pashmina_Shawl.jpg/800px-Pashmina_Shawl.jpg",
    additionalImages: [
      "https://www.jammukashmirtourism.gov.in/sites/default/files/styles/large/public/2023-05/Pashmina-Shawl.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnDQwVYbXoMqyZl4u-BgY3EiSOD1CQ7aLMkg&s",
      "https://www.craftsvilla.com/blog/wp-content/uploads/2018/06/Pashmina-Shawls.jpg",
    ],
  },
  "thangka- paintings": {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    description:
      "Thangka paintings are traditional Tibetan Buddhist scroll paintings, depicting deities, mandalas, and religious narratives. These artworks are used as teaching tools and for meditation purposes.",
    history: {
      started: "7th century CE",
      goldenPeriod: "11th-15th century",
      currentStatus: "Preserved by monasteries and artisans",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thangka_Painting.jpg/800px-Thangka_Painting.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdWBzsM75fK9MK-DFkdM5a5v_S0y-T5SnWg&s",
      "https://i1.himalayas.life/c/u/f67894297b6134a6b759b3a9ec15b6cb/2018/04/26054954/26-e1522558104714.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVX92htoKwCc4tDToVkM1jB4uN3Fym2-8zAA&s",
    ],
  },
  " mask-dance": {
    id: "mask-dance",
    name: "Mask Dance",
    description:
      "Mask Dance is a traditional performance art from the Himalayan regions, particularly in Sikkim, Ladakh, and Arunachal Pradesh. It involves dancers wearing elaborate masks and costumes to depict religious stories, mythological tales, and cultural themes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century under Buddhist monastic patronage",
      currentStatus: "Preserved through monasteries and cultural festivals",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mask_Dance_Ladakh.jpg/800px-Mask_Dance_Ladakh.jpg",
    additionalImages: [
      "https://www.sikkimtourism.gov.in/sites/default/files/styles/large/public/2023-05/Mask-Dance-Sikkim.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.tourmyindia.com/states/sikkim/image/mask-dance.jpg",
    ],
  },
  "traditional-boat-building": {
    id: "traditional-boat-building",
    name: "Traditional Boat Building",
    description:
      "Traditional boat building is a centuries-old craft practiced in coastal regions of India, particularly in Kerala and Goa. It involves constructing wooden boats, such as houseboats and fishing vessels, using locally sourced timber and traditional techniques.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period during maritime trade",
      currentStatus: "Preserved through cultural initiatives and tourism",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Traditional_Boat_Building.jpg/800px-Traditional_Boat_Building.jpg",
    additionalImages: [
      "https://www.keralatourism.org/images/kerala-houseboats.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://www.thebetterindia.com/wp-content/uploads/2018/04/Traditional-Boat-Building.jpg",
    ],
  },
  "coconut-crafts": {
    id: "coconut-crafts",
    name: "Coconut Crafts",
    description:
      "Coconut crafts involve creating functional and decorative items from coconut shells, husks, and leaves. These crafts include bowls, utensils, jewelry, and home decor, reflecting sustainable practices and creativity.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus:
        "Thriving through rural artisans and eco-friendly initiatives",
    },
    image:
      "https://thanhcongcraft.com/wp-content/uploads/2025/01/Coconut-Products-1200x900.png",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWIXijgESR8Nl5bYKUzPml2nDByPyH21CVeA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZkFAGLo50929SGMGWOR5iOjbNKdd_WSEIg&s",
      "https://static.wixstatic.com/media/1d0040_c804090e740449f5b00edcc3585756a9~mv2.jpeg/v1/fill/w_516,h_688,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1d0040_c804090e740449f5b00edcc3585756a9~mv2.jpeg",
    ],
  },
  "french-architecture": {
    id: "french-architecture",
    name: "French Architecture",
    description:
      "French architecture in India is a legacy of colonial influence, particularly in Pondicherry and Chandernagore. It features symmetrical designs, arched windows, and vibrant facades, blending European aesthetics with local elements.",
    history: {
      started: "17th century",
      goldenPeriod: "18th-19th century during French colonial rule",
      currentStatus: "Preserved as heritage sites and tourist attractions",
    },
    image:
      "https://maryannesfrance.com/wp-content/uploads/2020/08/%C2%A9-Olivier-Gobert-Troyes-La-Champagne-193-1024x683.jpg",
    additionalImages: [
      "https://www.thoughtco.com/thmb/a-bqf2GLUbyafZAzzvbajuudwjI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Architecture-France-Sarlat-117582299-crop-59f61fe6c4124400117047a3.jpg",
      "https://www.re-thinkingthefuture.com/wp-content/uploads/2022/01/A6155-Evolution-of-French-architecture-Image-4.jpg",
      "https://thearchitectsdiary.com/wp-content/uploads/2024/03/French-colonial-architecture-01.jpg",
    ],
  },

  // Bharatanatyam Dance (already exists, no changes needed)
  "bharatanatyam ": {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    description:
      "Bharatanatyam is one of India's oldest classical dance forms, originating from Tamil Nadu, featuring precise footwork and hand gestures.",
    history: {
      started: "2000 BCE",
      goldenPeriod: "Chola Dynasty (9th-13th century)",
      currentStatus: "Widely practiced across India and internationally",
    },
    image: "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
    additionalImages: [
      "https://natyalaya.org/wp-content/uploads/2019/02/barathanatyam-dance-classes-in-bangalore-1024x535.jpg",
      "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
      "https://images.squarespace-cdn.com/content/v1/60c7105b70fe8d18bb55fa5c/1624000918568-56FS9SI40BU7HCROUYO0/13123030_993619280706392_1702075096596948457_o.jpg",
    ],
  },
};

// Default art form details when specific information is not available
export const defaultArtFormDetails: ArtFormDetails = {
  id: "default",
  name: "Traditional Art Form",
  description:
    "This traditional art form represents the rich cultural heritage of its region, with distinctive elements that have been preserved through generations.",
  history: {
    started: "Ancient times",
    goldenPeriod: "17th to 19th century",
    currentStatus:
      "Practiced by dedicated artists and being preserved through cultural programs",
  },
  image:
    "https://www.aardvarkartservices.com/wp-content/uploads/2023/04/7-major-forms-of-art-Aardvark-Art-Service-blog-graphic-scaled.jpg",
  additionalImages: [
    "https://blogs.penkraft.in/wp-content/uploads/2021/06/Add-a-subheading-735x400.png",
    "https://blogs.penkraft.in/wp-content/uploads/2021/06/Add-a-subheading-735x400.png",
    "https://blogs.penkraft.in/wp-content/uploads/2021/06/Add-a-subheading-735x400.png",
  ],
};

// Get details for a specific art form, falling back to default if not found
export const getArtFormDetails = (artFormName: string): ArtFormDetails => {
  const key = artFormName.toLowerCase().replace(/\s+/g, "-");
  return (
    artFormDetailsMap[key] || {
      ...defaultArtFormDetails,
      id: key,
      name: artFormName,
    }
  );
};
