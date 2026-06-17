
export type Journey = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  duration: string;
  location: string;
  rating: number;
  timeline?: {
    title: string;
    description: string;
  }[];
  activities?: {
    name: string;
    description: string;
    duration: string;
    location: string;
    image: string;
  }[];
};

export const journeys: Journey[] = [
  {
    id: 1,
    title: "Rajasthan Heritage Tour",
    description: "Explore royal palaces, majestic forts, and vibrant markets in the land of kings. This journey takes you through the rich cultural heritage of Rajasthan, offering an authentic experience of royal living, traditional arts, and the vibrant desert landscape.",
    imageSrc: "https://s7ap1.scene7.com/is/image/incredibleindia/2-mehrangarh-fort-jodhpur-rajasthan-city-hero?qlt=82&ts=1726660925514",
    duration: "9 Days",
    location: "Jaipur, Udaipur, Jodhpur",
    rating: 4.9,
    timeline: [
      {
        title: "Arrival in Jaipur",
        description: "Arrive at Jaipur International Airport. Transfer to your hotel and enjoy a welcome dinner featuring traditional Rajasthani cuisine."
      },
      {
        title: "Exploring Jaipur",
        description: "Visit the iconic Amber Fort, City Palace, and Hawa Mahal. Experience the vibrant bazaars and witness traditional craftsmanship."
      },
      {
        title: "Jaipur to Udaipur",
        description: "Travel to the romantic city of Udaipur. En route, visit the Ajmer Sharif Dargah and enjoy the scenic beauty of the Aravalli range."
      },
      {
        title: "Lake City of Udaipur",
        description: "Explore the City Palace complex, take a boat ride on Lake Pichola, and visit the Jagdish Temple and Saheliyon ki Bari."
      },
      {
        title: "Udaipur Cultural Day",
        description: "Attend a cultural performance showcasing traditional Rajasthani folk music and dance, followed by a cooking class to learn authentic recipes."
      },
      {
        title: "Udaipur to Jodhpur",
        description: "Travel to the Blue City of Jodhpur. Visit the stunning Ranakpur Jain Temple complex en route."
      },
      {
        title: "Jodhpur Exploration",
        description: "Visit the imposing Mehrangarh Fort, Jaswant Thada, and Umaid Bhawan Palace. Explore the blue-painted houses in the old city."
      },
      {
        title: "Desert Experience",
        description: "Take a jeep safari to nearby villages and experience desert life. Enjoy a camel ride and witness a spectacular sunset over sand dunes."
      },
      {
        title: "Departure",
        description: "Transfer to Jodhpur Airport for your departure flight. Bid farewell to the colorful land of Rajasthan."
      }
    ],
    activities: [
      {
        name: "Amber Fort Elephant Ride",
        description: "Experience a royal welcome with a traditional elephant ride to the magnificent Amber Fort, just as the maharajas did centuries ago.",
        duration: "3 hours",
        location: "Jaipur",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071"
      },
      {
        name: "Lake Pichola Boat Cruise",
        description: "Enjoy a serene sunset cruise on the picturesque Lake Pichola, offering stunning views of the City Palace and Lake Palace.",
        duration: "2 hours",
        location: "Udaipur",
        image: "https://images.unsplash.com/photo-1627301517082-56363499c8b3?q=80&w=1000"
      },
      {
        name: "Blue City Walking Tour",
        description: "Navigate the narrow winding streets of Jodhpur's old city with a knowledgeable local guide, discovering hidden gems and photogenic blue houses.",
        duration: "4 hours",
        location: "Jodhpur",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070"
      },
      {
        name: "Rajasthani Cooking Class",
        description: "Learn to prepare authentic Rajasthani dishes like Dal Baati Churma, Gatte ki Sabzi, and Ker Sangri under the guidance of expert local chefs.",
        duration: "3 hours",
        location: "Jaipur",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2076"
      },
      {
        name: "Textile Workshop",
        description: "Participate in a hands-on workshop to learn traditional Rajasthani textile techniques including block printing, tie-dye, and embroidery.",
        duration: "5 hours",
        location: "Jodhpur",
        image: "https://images.unsplash.com/photo-1586959140254-9639421e431f?q=80&w=1974"
      }
    ]
  },
  {
    id: 2,
    title: "Kerala Backwater Expedition",
    description: "Glide through serene backwaters and experience the tranquil village life of God's Own Country. Kerala offers a perfect blend of natural beauty, cultural richness, and Ayurvedic wellness, creating a rejuvenating experience for all travelers.",
    imageSrc: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070",
    duration: "7 Days",
    location: "Kochi, Alleppey, Kumarakom",
    rating: 4.8,
    timeline: [
      {
        title: "Arrival in Kochi",
        description: "Arrive at Cochin International Airport. Transfer to your hotel in Fort Kochi and enjoy a leisurely evening exploring the historic waterfront."
      },
      {
        title: "Kochi Heritage Tour",
        description: "Visit the Chinese Fishing Nets, St. Francis Church, and Mattancherry Palace. In the evening, witness a traditional Kathakali dance performance."
      },
      {
        title: "Kochi to Alleppey",
        description: "Travel to Alleppey, the Venice of the East. Board your private houseboat for an overnight stay cruising through the backwaters."
      },
      {
        title: "Backwater Cruise",
        description: "Continue your houseboat journey, observing rural Kerala life along the shores, enjoying freshly prepared Kerala cuisine on board."
      },
      {
        title: "Alleppey to Kumarakom",
        description: "Disembark at Kumarakom and check into a lakeside resort. Relax with an authentic Ayurvedic massage and wellness treatment."
      },
      {
        title: "Kumarakom Bird Sanctuary",
        description: "Visit the Kumarakom Bird Sanctuary in the morning. Spend the afternoon at leisure enjoying the resort amenities."
      },
      {
        title: "Departure",
        description: "Transfer to Cochin International Airport for your departure flight, taking with you memories of Kerala's serene beauty."
      }
    ],
    activities: [
      {
        name: "Houseboat Overnight Stay",
        description: "Experience traditional Kerala village life from the comfort of a luxury houseboat, cruising through palm-fringed narrow canals.",
        duration: "24 hours",
        location: "Alleppey",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070"
      },
      {
        name: "Kathakali Performance",
        description: "Witness the classical Kerala dance form with elaborate makeup, costumes and subtle gestures that narrate stories from Hindu epics.",
        duration: "2 hours",
        location: "Kochi",
        image: "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170"
      },
      {
        name: "Ayurvedic Wellness Treatment",
        description: "Indulge in a traditional Ayurvedic massage and wellness ritual at an authentic Kerala spa, using herbal oils and ancient techniques.",
        duration: "3 hours",
        location: "Kumarakom",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
      },
      {
        name: "Spice Plantation Tour",
        description: "Explore a fragrant spice garden with a knowledgeable guide who explains the cultivation and uses of various spices like cardamom, pepper, and cloves.",
        duration: "4 hours",
        location: "Thekkady",
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=2070"
      }
    ]
  },
  {
    id: 3,
    title: "Himalayan Adventure",
    description: "Trek through breathtaking mountain trails and discover remote villages in the mighty Himalayas. Experience the spiritual tranquility and natural grandeur of India's northern frontier, with its snow-capped peaks, ancient monasteries, and diverse ecosystems.",
    imageSrc: "https://plus.unsplash.com/premium_photo-1661963739151-41947d4d04e6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fEhpbWFsYXlhbiUyMEFkdmVudHVyZXxlbnwwfHwwfHx8MQ%3D%3D",
    duration: "12 Days",
    location: "Rishikesh, Manali, Dharamshala",
    rating: 4.7,
    timeline: [
      {
        title: "Arrival in Rishikesh",
        description: "Arrive at Dehradun Airport and transfer to Rishikesh. Check into your riverside retreat and attend the evening Ganga Aarti ceremony."
      },
      {
        title: "Rishikesh Exploration",
        description: "Practice yoga by the Ganges, visit ashrams, and explore the Beatles Ashram. Try white water rafting in the afternoon."
      },
      {
        title: "Rishikesh to Manali",
        description: "Take a scenic drive to Manali, climbing through the foothills of the Himalayas. Enjoy the changing landscapes and mountain views."
      },
      {
        title: "Manali Local Tour",
        description: "Visit the Hadimba Temple, Old Manali, and Vashisht Hot Springs. Enjoy the evening at the Mall Road."
      },
      {
        title: "Solang Valley Adventure",
        description: "Spend the day at Solang Valley engaging in adventure activities like paragliding, zorbing, and cable car rides (seasonal)."
      },
      {
        title: "Manali to Dharamshala",
        description: "Travel to Dharamshala, home of the Dalai Lama and the Tibetan government in exile. Enjoy the stunning mountain views en route."
      },
      {
        title: "McLeodganj Exploration",
        description: "Visit the Namgyal Monastery, Tibet Museum, and Bhagsunag Waterfall. Explore the local markets for Tibetan crafts."
      },
      {
        title: "Triund Trek",
        description: "Embark on a day trek to Triund, offering panoramic views of the Dhauladhar range. Return to Dharamshala by evening."
      },
      {
        title: "Dharamshala Meditation Retreat",
        description: "Participate in a guided meditation session at a local monastery. Learn about Tibetan Buddhism and its practices."
      },
      {
        title: "Dharamshala to Palampur",
        description: "Visit the tea gardens of Palampur and learn about tea processing. Return to Dharamshala in the evening."
      },
      {
        title: "Free Day in Dharamshala",
        description: "Spend the day at leisure, exploring hidden gems or revisiting favorite spots. Optional cooking class to learn Tibetan cuisine."
      },
      {
        title: "Departure",
        description: "Transfer to Dharamshala Airport for your departure flight, carrying the serenity of the Himalayas with you."
      }
    ],
    activities: [
      {
        name: "White Water Rafting",
        description: "Navigate the thrilling rapids of the Ganges River with experienced guides, enjoying the perfect blend of adventure and natural beauty.",
        duration: "3 hours",
        location: "Rishikesh",
        image: "https://images.unsplash.com/photo-1530866495561-503e9ac26961?q=80&w=2070"
      },
      {
        name: "Paragliding in Solang Valley",
        description: "Soar above the Himalayan landscapes with an expert tandem paragliding pilot, witnessing breathtaking views of snow-capped peaks.",
        duration: "30 minutes",
        location: "Manali",
        image: "https://images.unsplash.com/photo-1622158014847-4337d01a1a76?q=80&w=1974"
      },
      {
        name: "Tibetan Cooking Class",
        description: "Learn to prepare authentic Tibetan dishes like momos, thukpa, and butter tea under the guidance of Tibetan chefs in a traditional kitchen.",
        duration: "4 hours",
        location: "Dharamshala",
        image: "https://images.unsplash.com/photo-1590243646179-a36c0cbd4309?q=80&w=1970"
      },
      {
        name: "Yoga and Meditation by the Ganges",
        description: "Experience a transformative yoga and meditation session guided by experienced practitioners in the spiritual environment of Rishikesh.",
        duration: "2 hours",
        location: "Rishikesh",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022"
      },
      {
        name: "Triund Trek",
        description: "Embark on a moderate trek through oak and rhododendron forests to Triund, offering stunning views of the Kangra Valley and Dhauladhar ranges.",
        duration: "8 hours",
        location: "Dharamshala",
        image: "https://images.unsplash.com/photo-1572262083412-8656f17f406c?q=80&w=1931"
      }
    ]
  }
];

// Function to get a journey by ID
export const getJourneyById = (id: number): Journey | undefined => {
  return journeys.find(journey => journey.id === id);
};
