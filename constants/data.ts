export const districts = ["Thakurgaon", "Panchagarh", "Nilphamari", "Lalmonirhat", "Kurigram", "Sherpur",
    "Jamalpur", "Mymensingh", "Netrokona", "Sunamganj", "Sylhet", "Moulvibazar", "Habiganj",
    "Brahmanbaria", "Khagrachari", "Rangamati", "Bandarban", "CoxsBazar", "Chittagong", "Noakhali",
    "Comilla", "Feni", "Bhola", "Patuakhali", "Barguna", "Pirojpur", "Jhalokati",
    "Chandpur", "Kishorganj", "Narsingdi", "Gazipur", "Laxmipur", "Barishal",
    "Shariatpur", "Rajshahi", "Satkhira", "Jessore", "Jhenaidah", "Chuadanga",
    "Chapainawabganj", "Naogaon", "Rangpur", "Gaibandha", "Bagerhat", "Khulna", "Dinajpur",
    "Sirajganj", "Natore", "Tangail", "Joypurhat", "Pabna", "Magura",
    "Madaripur", "Munshiganj", "Meherpur", "Kushtia", "Rajbari", "Narail",
    "Gopalganj", "Manikganj", "Narayanganj", "Faridpur", "Bogra", "Dhaka"
];

export const divisions = ["Dhaka", "Chittagong", "Khulna", "Barishal", "Rajshahi", "Rangpur", "Mymensingh", "Sylhet"];

export const division_districts: Record<string, string[]> = {
    "Dhaka": [
        "Dhaka",
        "Gazipur",
        "Narayanganj",
        "Narsingdi",
        "Manikganj",
        "Munshiganj",
        "Faridpur",
        "Gopalganj",
        "Madaripur",
        "Rajbari",
        "Shariatpur",
        "Kishorganj",
        "Tangail"
    ],
    "Chittagong": [
        "Chittagong",
        "CoxsBazar",
        "Bandarban",
        "Rangamati",
        "Khagrachari",
        "Noakhali",
        "Feni",
        "Laxmipur",
        "Comilla",
        "Chandpur",
        "Brahmanbaria"
    ],
    "Rajshahi": [
        "Rajshahi",
        "Natore",
        "Naogaon",
        "Chapainawabganj",
        "Joypurhat",
        "Bogra",
        "Pabna",
        "Sirajganj"
    ],
    "Khulna": [
        "Khulna",
        "Bagerhat",
        "Satkhira",
        "Jessore",
        "Narail",
        "Magura",
        "Jhenaidah",
        "Chuadanga",
        "Meherpur",
        "Kushtia"
    ],
    "Barishal": [
        "Barishal",
        "Bhola",
        "Patuakhali",
        "Barguna",
        "Pirojpur",
        "Jhalokati"
    ],
    "Sylhet": [
        "Sylhet",
        "Moulvibazar",
        "Habiganj",
        "Sunamganj"
    ],
    "Rangpur": [
        "Rangpur",
        "Dinajpur",
        "Thakurgaon",
        "Panchagarh",
        "Nilphamari",
        "Lalmonirhat",
        "Kurigram",
        "Gaibandha"
    ],
    "Mymensingh": [
        "Mymensingh",
        "Jamalpur",
        "Sherpur",
        "Netrokona"
    ]
}

export const divisionColorMap: Record<string, string> = {
    "Dhaka": "blue",
    "Chittagong": "green",
    "Rajshahi": "orange",
    "Khulna": "purple",
    "Barishal": "cyan",
    "Mymensingh": "magenta",
    "Sylhet": "yellow",
    "Rangpur": "brown"
}