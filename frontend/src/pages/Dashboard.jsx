import React, { Component } from 'react';
import withNavigation from '../utils/wthNavigation'; // Assure-toi du bon chemin
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Pagination,
  Typography,
  Box,
  IconButton,
  Container,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  ExitToApp as ExitToAppIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../utils/api'; 
import swal from 'sweetalert';


class Dashboard extends Component {
  searchTimeout = null;
  constructor() {
    super();
    this.state = {
      token: '',
      openProductModal: false,
      openProductEditModal: false,
      id: '',
      name: '',
      description: '',
      price: '',
      quantityAvailable: '',
      page: 1,
      search: '',
      products: [],
      pages: 0,
      loading: false
    };
  }


  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.props.navigate('/');
    } else {
      this.setState({ token }, () => {
        this.getProduct();
      });
    }
  }

  // getProduct = async () => {
  //   try {
  //     const { page, search } = this.state;
  //     const response = await getProducts(page, search);
      
  //     const products = response.data || [];

  //     const filtered = search.trim()
  //       ? products.filter(p =>
  //         p.name.toLowerCase().includes(search.trim().toLowerCase())
  //       )
  //       : products;

  //     this.setState({
  //       loading: false,
  //       products: filtered,
  //       pages: response.totalPages || 1
  //     });
  //   } catch (err) {
  //     console.error("Erreur de recherche:", err.response?.data || err.message);
  //     this.setState({ loading: false, products: [] });
  //     swal("Erreur", "Échec de la recherche des produits", "error");
  //   }
  // };

  getProduct = async () => {
    try {
      const { page, search } = this.state;
      const response = await getProducts(page, search);
      const products = Array.isArray(response.products) ? response.products : [];
  
      if (products.length === 0) {
        console.log("Aucun produit trouvé dans la réponse.");
      }
        const filtered = search.trim()
        ? products.filter(p =>
            p.name.toLowerCase().includes(search.trim().toLowerCase())
          )
        : products;
  
      this.setState({
        loading: false,
        products: filtered,
        pages: response.totalPages || 1
      });
    } catch (err) {
      this.setState({ loading: false, products: [] });
      swal("Erreur", "Échec de la recherche des produits", "error");
    }
  };  
  
  

  deleteProduct = (id) => {
    swal({
      title: "Êtes-vous sûr?",
      text: "Une fois supprimé, vous ne pourrez pas récupérer ce produit!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProduct(id).then((res) => {
          swal({
            title: "Succès",
            text: res.message || "Produit supprimé avec succès",
            icon: "success"
          });
          this.getProduct(); 
        }).catch((err) => {
          console.error("Erreur:", err.response?.data);
          this.getProduct(); 
          swal({
            title: "Erreur",
            text: err.response?.data?.error || "Échec de la suppression",
            icon: "error"
          });
        });
      }
    });
  };



  handleSearchChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, page: 1 }, () => {
      clearTimeout(this.searchTimeout);

      if (value.trim().length === 0 || value.trim().length > 0) {
        this.searchTimeout = setTimeout(() => {
          this.getProduct();
        }, 500);
      }
    });
  };




  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
    });
  }

  logOut = () => {
    swal({
      title: "Êtes-vous sûr ?",
      text: "Vous allez être déconnecté.",
      icon: "warning",
      buttons: ["Annuler", "Se déconnecter"],
      dangerMode: true,
    })
      .then((willLogout) => {
        if (willLogout) {
          localStorage.getItem('accessToken');
          swal("Déconnecté avec succès !", {
            icon: "success",
            timer: 1500,
            buttons: false,
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 1600);
        }
      });
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  addProduct = async () => {
    const productData = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      quantityAvailable: this.state.quantityAvailable
    };

    try {
      const response = await addProduct(productData); 
      swal("Succès!", response.message, "success");
      this.handleProductClose();
      this.getProduct();
    } catch (error) {
      console.error("Erreur:", error.response?.data);
      swal("Erreur", error.response?.data?.message || "Échec de l'ajout", "error");
    }
  };

  updateProduct = async () => {
    const productData = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      quantityAvailable: this.state.quantityAvailable
    };

    try {
      const response = await updateProduct(this.state.id, productData); 
      swal({
        title: "Succès",
        text: response.message || "Produit mis à jour avec succès",
        icon: "success"
      });
      this.handleProductEditClose();
      this.getProduct();
    } catch (error) {
      console.error("Erreur de mise à jour:", error.response?.data);
      swal({
        title: "Erreur",
        text: error.response?.data?.error || "Échec de la mise à jour du produit",
        icon: "error"
      });
      this.handleProductEditClose();
    }
  };



  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
      id: '',
      name: '',
      description: '',
      price: '',
      quantityAvailable: ''
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      quantityAvailable: data.quantityAvailable,
    });
  };

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  render() {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {this.state.loading && <LinearProgress />}

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" component="h1">
            Tableau de Bord
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={this.handleProductOpen}
              sx={{ mr: 2 }}
            >
              Ajouter Produit
            </Button>
            <Button
              variant="contained"
              startIcon={<ExitToAppIcon />}
              onClick={this.logOut}
              sx={{
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              Déconnexion
            </Button>

          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher un produit..."
            onChange={this.handleSearchChange}
            name="search"
            sx={{ maxWidth: 600 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Prix</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Quantité</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Aucun produit trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  this.state.products.map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell sx={{
                        maxWidth: 200,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {row.description}
                      </TableCell>
                      <TableCell align="right">{row.price} Fcfa</TableCell>
                      <TableCell align="right">{row.quantityAvailable}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => this.handleProductEditOpen(row)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => this.deleteProduct(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            {this.state.search.trim() === '' && (
              <Pagination
                count={this.state.pages}
                page={this.state.page}
                onChange={this.pageChange}
                color="primary"
              />
            )}
          </Box>
        </Paper>

        <Dialog
          open={this.state.openProductModal}
          onClose={this.handleProductClose}
          fullWidth
          maxWidth="sm"
          sx={{
            '& .MuiDialog-paper': {
              overflowY: 'visible'
            }
          }}
        >
          <DialogTitle sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 2.5,
            textAlign: 'center',
            position: 'relative',
            marginBottom: '8px',
            '&::after': {
              content: '""',
              display: 'block',
              height: '16px',
              width: '100%'
            }
          }}>
            Ajouter un produit
          </DialogTitle>

          <DialogContent sx={{
            pt: 0,
            pb: 3,
            overflowY: 'visible'
          }}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                '& .MuiTextField-root': {
                  width: '100%',
                  my: 0.5
                }
              }}
            >
              <TextField
                label="Nom du produit*"
                variant="outlined"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                size="small"
                sx={{
                  mt: 0,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />

              <TextField
                label="Description*"
                variant="outlined"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                multiline
                rows={3}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    alignItems: 'flex-start'
                  }
                }}
              />

              <Box sx={{
                display: 'flex',
                gap: 2,
                '& > *': {
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }
              }}>
                <TextField
                  label="Prix (FCFA)*"
                  variant="outlined"
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">FCFA</InputAdornment>,
                  }}
                  size="small"
                />

                <TextField
                  label="Quantité disponible*"
                  variant="outlined"
                  type="number"
                  name="quantityAvailable"
                  value={this.state.quantityAvailable}
                  onChange={this.onChange}
                  size="small"
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: 'divider',
            gap: 2,
            '& .MuiButton-root': {
              borderRadius: '6px',
              textTransform: 'none',
              padding: '8px 20px'
            }
          }}>
            <Button
              onClick={this.handleProductClose}
              variant="outlined"
              color="inherit"
            >
              Annuler
            </Button>
            <Button
              disabled={!this.state.name || !this.state.description || !this.state.price || !this.state.quantityAvailable}
              onClick={this.addProduct}
              variant="contained"
              color="primary"
              sx={{
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              Ajouter le produit
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleProductEditClose}
          fullWidth
          maxWidth="sm"
          sx={{
            '& .MuiDialog-paper': {
              overflowY: 'visible'
            }
          }}
        >
          <DialogTitle sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 2.5,
            textAlign: 'center',
            position: 'relative',
            marginBottom: '8px',
            '&::after': {
              content: '""',
              display: 'block',
              height: '16px',
              width: '100%'
            }
          }}>
            Modifier un produit
          </DialogTitle>

          <DialogContent sx={{
            pt: 0,
            pb: 3,
            overflowY: 'visible'
          }}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                '& .MuiTextField-root': {
                  width: '100%',
                  my: 0.5
                }
              }}
            >
              <TextField
                label="Nom du produit*"
                variant="outlined"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />

              <TextField
                label="Description*"
                variant="outlined"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                multiline
                rows={3}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    alignItems: 'flex-start'
                  }
                }}
              />

              <Box sx={{
                display: 'flex',
                gap: 2,
                '& > *': {
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }
              }}>
                <TextField
                  label="Prix (FCFA)*"
                  variant="outlined"
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">FCFA</InputAdornment>,
                  }}
                  size="small"
                />

                <TextField
                  label="Quantité disponible*"
                  variant="outlined"
                  type="number"
                  name="quantityAvailable"
                  value={this.state.quantityAvailable}
                  onChange={this.onChange}
                  size="small"
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: 'divider',
            gap: 2,
            '& .MuiButton-root': {
              borderRadius: '6px',
              textTransform: 'none',
              padding: '8px 20px'
            }
          }}>
            <Button
              onClick={this.handleProductEditClose}
              variant="outlined"
              color="inherit"
            >
              Annuler
            </Button>
            <Button
              disabled={
                !this.state.name ||
                !this.state.description ||
                !this.state.price ||
                !this.state.quantityAvailable
              }
              onClick={this.updateProduct}
              variant="contained"
              color="primary"
              sx={{
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    );
  }
}


export default withNavigation(Dashboard);