// api/script.js

export default function handler(req, res) {
  const { record_id, field1, field2 } = req.body;

  // Your script logic here
  console.log(`Record ID: ${record_id}, Field1: ${field1}, Field2: ${field2}`);

  res.status(200).json({ message: 'Script executed successfully' });
}
