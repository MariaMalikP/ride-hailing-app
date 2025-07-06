const { users } = require("../data/storage");

let userId = 1;

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = { id: userId++, name, email, password, role };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json(user);
};
