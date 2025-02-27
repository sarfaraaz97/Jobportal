"use client"

import { useEffect, useState } from "react"
import {
  Card,
  Grid,
  Typography,
  Box,
  Chip,
  IconButton,
  Container,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/jobPosts`)
        setPosts(response.data)
        setFilteredPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(
        (post) =>
          post.postProfile.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.postDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.postTechStack.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredPosts(filtered)
    }
  }, [searchTerm, posts])

  const handleEdit = (id) => {
    navigate("/edit", { state: { id } })
  }

  const openDeleteDialog = (post) => {
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
    setPostToDelete(null)
  }

  const handleDelete = async () => {
    if (!postToDelete) return

    try {
      await axios.delete(`http://localhost:8080/jobPost/${postToDelete.postId}`)
      setPosts(posts.filter((post) => post.postId !== postToDelete.postId))
      closeDeleteDialog()
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Find Your Dream Job
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse through our curated list of job opportunities
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search jobs, skills, or descriptions..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/create")}
            sx={{
              height: { sm: 56 },
              whiteSpace: "nowrap",
              minWidth: { xs: "100%", sm: "auto" },
            }}
          >
            Post a Job
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.postId}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    {post.postProfile}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.reqExperience} years experience
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ mb: 3, color: "text.secondary" }}>
                    {post.postDesc}
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {post.postTechStack.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(25, 118, 210, 0.08)",
                          color: "primary.main",
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <IconButton aria-label="edit" onClick={() => handleEdit(post.postId)} sx={{ color: "primary.main" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => openDeleteDialog(post)} sx={{ color: "error.main" }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No job postings found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {searchTerm ? "Try a different search term" : "Add your first job posting"}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the job posting for "{postToDelete?.postProfile}"? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default AllPosts

