const jwt = require('jsonwebtoken');

try {
    const decoded = jwt.verify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6ImRiN2FhYjgxMmw3IiwibmFtZSI6IlRlc3RlIiwiaWF0IjoxNzY0NzgwMjIyLCJleHAiOjE3NjQ3OTQ2MjJ9.vko-APX5XAK8V9avhvLspa_DA-V4lP2VUiGY-IsbBV4",
        "42f0a90f222634edfb0fead629ec63cef2ce834ad39ddde40fb19e194d4edd1b5999cd199c2bef1fb870611475ef497a46c5a3eefd47797e2145a04804c71482"
    );
    console.log("TOKEN VÁLIDO!", decoded);
} catch (err) {
    console.log("TOKEN INVÁLIDO:", err.message);
}
