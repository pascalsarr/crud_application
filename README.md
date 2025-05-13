# 🛍️ crud-application

Une application complète de gestion de produits, construite avec **React** pour le frontend, **Node.js/Express** pour le backend, et **MongoDB** pour la base de données. Cette application permet d'ajouter, de modifier, de supprimer , de rechercher et de consulter des produits via une API sécurisée.

---

## 🚀 Fonctionnalités principales

- Authentification des utilisateurs (via `/auth`)
- Création, consultation, recherche, mise à jour et suppression de produits
- Interface utilisateur moderne avec **Material UI (MUI)**
- Requêtes HTTP via **Axios**
- Notifications via **SweetAlert**

---

## ⚙️ Technologies utilisées

### Frontend :
- React 19 
- React Router DOM
- Axios
- Material UI (MUI)
- SweetAlert

### Backend :
- Node.js
- Express.js
- MongoDB avec Mongoose
- dotenv
- CORS

---

## 📁 Structure du projet

```bash
/backend
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── productController.js
├── middleware/
│   ├── authMiddleware.js
├── models/
│   ├── productModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   └── productRoutes.js
├── .env
└── server.js

/frontend
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── routes/
│   │   ├── PrivateRoute.js
│   │   └── route.js
│   ├── styles/
│   │   ├── footer.css
│   │   ├── login.css
│   │   └── navbar.css
│   ├── utils/
│   │   ├── api.js
│   │   ├── withNavigation.js
│   ├── App.js
│   └── index.js
└── .env

```


## 🛠️ Installation

## Build Instructions

#### 1. Commencez par cloner le dépôt en local

```
    git clone https://github.com/pascalsarr/crud-application.git
```

et accédez au répertoire du projet en utilisant

```
    cd crud-application
```

## Créer un fichier .env

Dans le dossier backend à la racine créer un fichier **.env** et y renseigner les informations suivantes:

```
# This line is ignored since it's a comment
MONGO_URI = mongodb+srv://<user>:<password>@cluster0.mongodb.net/nomDeTaBase
JWT_SECRET = générer une clé secrète avec crypto ou autre.
REFRESH_TOKEN_SECRET = générer une clé secrète avec crypto ou autre.
```


#### 2. Configurer l'environnement frontend

```
npm install
```

#### 3. Lancer le frontend

```
npm start
```

#### 4. Configurer l'environnement backend


```
npm install
```

#### 5. Lancer le backend

```
npm start
```

---

## 📸 Capture d’écran

![1](https://github.com/user-attachments/assets/faaa7faa-aa3c-4b56-bcb1-eafa7c882e16)
![2](https://github.com/user-attachments/assets/9680e758-e956-4cd0-b244-9d3a69671557)
![3](https://github.com/user-attachments/assets/639b0202-2ea9-4551-9b2b-1ce8aaf7cd7f)
![4](https://github.com/user-attachments/assets/078fb41d-2787-4d62-be37-c7370e7a9d7c)
![5](https://github.com/user-attachments/assets/ceaceec1-8df6-4b3c-9218-1306e99474f8)
![6](https://github.com/user-attachments/assets/1d9e3d69-bbc5-4d2e-9a43-82e92035bd6f)

---

## 🤝 Contribution

Les contributions sont les bienvenues !  
Fork le projet, crée une branche, fais des modifications et ouvre une Pull Request.

---

## 📄 Licence

Distribué sous la licence **MIT**.

---

## 🔗 Liens utiles

- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Express.js](https://expressjs.com/)
EOF
