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

![1](https://github.com/user-attachments/assets/f16b14ad-3771-4288-8624-cfc2a88a5ff4)
![3](https://github.com/user-attachments/assets/273525d9-9b36-456d-bfc2-8dca7296a250)
![5](https://github.com/user-attachments/assets/fd2c9e75-d9f4-4696-aef1-a0084f45f80c)
![6](https://github.com/user-attachments/assets/9df34385-746f-41b2-8d43-09e4304f9ce1)
![7](https://github.com/user-attachments/assets/967753e8-fae4-4a91-b622-fc5d53c5c942)
![9](https://github.com/user-attachments/assets/54cd4866-75e7-45df-a54b-a1b45d4b574c)
![10](https://github.com/user-attachments/assets/8293df53-587f-4771-9b0b-459be8019e6c)


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
