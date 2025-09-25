const users = [
  {
    _id: "1",
    username: "john_doe",
    email: "john@example.com",
    password: "hashed_password_123",
    profilePicture: "https://example.com/images/john.jpg",
    gender: "male"
  },
  {
    _id: "2",
    username: "jane_smith",
    email: "jane@example.com",
    password: "hashed_password_456",
    profilePicture: "https://example.com/images/jane.jpg",
    gender: "female"
  },
  {
    _id: "3",
    username: "alex_dev",
    email: "alex@example.com",
    password: "hashed_password_789",
    profilePicture: null,
    gender: "male"
  },
  {
    _id: "4",
    username: "sara_coder",
    email: "sara@example.com",
    password: "hashed_password_101",
    profilePicture: "https://example.com/images/sara.jpg",
    gender: "female"
  },
  {
    _id: "5",
    username: "mike_tech",
    email: "mike@example.com",
    password: "hashed_password_202",
    profilePicture: null,
    gender: "male"
  }
];
const transactions = [
  {
    _id: "1",
    userId: "u1",
    description: "Bought groceries",
    amount: 45.5,
    location: "Supermarket A",
    category: "Food",
    data: "2025-09-22",
    paymentType: "Credit Card"
  },
  {
    _id: "2",
    userId: "u2",
    description: "Monthly rent",
    amount: 500,
    location: "Home",
    category: "Housing",
    data: "2025-09-01",
    paymentType: "Bank Transfer"
  },
  {
    _id: "3",
    userId: "u1",
    description: "Movie tickets",
    amount: 30,
    location: "Cinema X",
    category: "Entertainment",
    data: "2025-09-20",
    paymentType: "Cash"
  }
];

export { users, transactions };


//to test my schema is work or not 
