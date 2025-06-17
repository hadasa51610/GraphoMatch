# ✍️ GraphoMatch

**GraphoMatch** is an **AI-powered platform** that analyzes users' handwriting to assess their personality traits and recommend matching career paths. The system is designed for both job seekers and employers, providing deep insight into personal characteristics and occupational compatibility.

---

## 📌 Features

- ✍️ Upload handwriting samples and get graphology-based personality analysis  
- 🧠 AI-driven job recommendations based on traits  
- 💼 Employers can view and filter candidates  
- 📊 Admin dashboard with statistics and feedback  
- 🧾 Analysis result per user  

---

## 🧱 Tech Stack

- **Frontend:** React 19, TailwindCSS, TypeScript, Angular  
- **Backend:** ASP.NET Core (C#), Python (Graphology Analysis)  
- **Database:** MySQL (CleverCloud)  
- **Storage:** Cloudinary (for handwriting images)  
- **Communication:** RESTful Web API, Axios  
- **Authentication & Authorization:** Custom Role-based (Admin, Graphologist, User)  

---

## 🚀 Getting Started

### Prerequisites

- Node.js  
- .NET 6 SDK  
- Python 3.10+  
- MySQL Server or CleverCloud DB  

### 🔧 Clone the repo

```bash
git clone https://github.com/your-username/grapho-match.git
cd grapho-match
```

### ⚛️ Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 🖥 Backend Setup

```bash
cd server
dotnet restore
dotnet run
```

### 🧠 Python Graphology Server

```bash
cd python-graphology
pip install -r requirements.txt
python app.py
```

---

## 🗃️ Folder Structure

```bash
├── client/                  # React frontend
├── server/                  # ASP.NET Core backend
├── python-graphology/       # Python handwriting analysis
├── database/                # Migration files / seeders
├── README.md
```

---

## ⚙️ Environment Variables

### `.env` (React)

```env
VITE_API_URL=http://localhost:5000
```

### `appsettings.json` (C#)

```json
"ConnectionStrings": {
  "GraphoMatchDB": "server=...;user=...;password=...;database=...;Port=3306"
}
```

### `.env` (Python)

```env
OPENAI_API_KEY=your_api_key
```

---

## 👤 Roles & Permissions

| Role         | Permissions                                                  |
|--------------|--------------------------------------------------------------|
| **Admin**    | Manage users, feedback, stats, jobs, all data                |
| **Graphologist** | View and analyze handwriting, add tips and traits        |
| **User**     | Upload handwriting and CV, view analysis and job matches     |

---

## 🧪 Testing

```bash
dotnet test
npm run test
```

---

## 📝 License

This project is licensed under the MIT License.
