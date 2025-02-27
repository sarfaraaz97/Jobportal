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
  Tooltip,
  Skeleton,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import FilterListIcon from "@mui/icons-material/FilterList"
import WorkIcon from "@mui/icons-material/Work"
import FiberNewIcon from "@mui/icons-material/FiberNew"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:8080/jobPosts`)
        setPosts(response.data)
        setFilteredPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError("Failed to load job listings. Please try again later.")
      } finally {
        setLoading(false)
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

  const handleEdit = (id, e) => {
    e.stopPropagation()
    navigate("/edit", { state: { id } })
  }

  const openDeleteDialog = (post, e) => {
    e.stopPropagation()
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

  const handleJobCardClick = (id) => {
    navigate("/edit", { state: { id } })
  }

  // Function to check if post was created within the last 7 days
  // In a real app, you'd have a createdAt field to check
  const isNewPost = () => {
    // Random for demonstration, replace with actual logic
    return Math.random() > 0.7
  }

  // Get highlights for the hero section (featured jobs)
  const featuredJobs = posts.slice(0, 3)

  // Loading skeleton
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Skeleton variant="text" width="60%" height={60} />
          <Skeleton variant="text" width="40%" height={30} sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" height={56} sx={{ mb: 4 }} />
        </Box>

        <Grid container spacing={3}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "error.light",
            color: "error.contrastText",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
          color: "white",
          pt: { xs: 6, md: 8 },
          pb: { xs: 8, md: 10 },
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              zIndex: 1,
              position: "relative",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                mb: 2,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Find Your Dream Job
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 4,
                maxWidth: "800px",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Browse our curated list of premium opportunities
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                maxWidth: "800px",
                gap: 2,
                mb: 4,
              }}
            >
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
                  sx: {
                    bgcolor: "white",
                    borderRadius: 1,
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => navigate("/create")}
                sx={{
                  height: { sm: 56 },
                  whiteSpace: "nowrap",
                  minWidth: { xs: "100%", sm: "auto" },
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Post a Job
              </Button>
            </Box>

            {/* Featured Stats */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 6 },
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700}>
                  {posts.length}
                </Typography>
                <Typography variant="body1">Job Listings</Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700}>
                  {posts.reduce((acc, post) => acc + post.postTechStack.length, 0)}
                </Typography>
                <Typography variant="body1">Skills in Demand</Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" fontWeight={700}>
                  24/7
                </Typography>
                <Typography variant="body1">Support</Typography>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            right: -150,
            bottom: -100,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
          }}
        />
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: { xs: -4, md: -5 }, mb: 8, position: "relative", zIndex: 2 }}>
        {/* Filter section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FilterListIcon color="primary" />
            <Typography variant="h6">Refine Your Search</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Chip
              label="All Jobs"
              color="primary"
              variant="filled"
              onClick={() => setSearchTerm("")}
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label="JavaScript"
              variant="outlined"
              onClick={() => setSearchTerm("JavaScript")}
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label="React"
              variant="outlined"
              onClick={() => setSearchTerm("React")}
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label="Python"
              variant="outlined"
              onClick={() => setSearchTerm("Python")}
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label="Java"
              variant="outlined"
              onClick={() => setSearchTerm("Java")}
              sx={{ fontWeight: 500 }}
            />
          </Box>
        </Paper>

        {/* Featured Jobs */}
        {searchTerm === "" && featuredJobs.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, display: "flex", alignItems: "center" }}>
              <WorkIcon sx={{ mr: 1 }} color="primary" />
              Featured Opportunities
            </Typography>
            <Grid container spacing={3}>
              {featuredJobs.map((post) => (
                <Grid item xs={12} md={4} key={`featured-${post.postId}`}>
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.05), white)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleJobCardClick(post.postId)}
                  >
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                          {post.postProfile}
                        </Typography>
                        {isNewPost() && (
                          <Chip
                            icon={<FiberNewIcon />}
                            label="New"
                            color="secondary"
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                        )}
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          {post.reqExperience}
                        </Box>{" "}
                        years experience required
                      </Typography>

                      <Typography
                        variant="body1"
                        paragraph
                        sx={{
                          mb: 3,
                          color: "text.secondary",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.postDesc}
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {post.postTechStack.slice(0, 3).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(25, 118, 210, 0.08)",
                              color: "primary.main",
                              fontWeight: 500,
                            }}
                          />
                        ))}
                        {post.postTechStack.length > 3 && (
                          <Chip
                            label={`+${post.postTechStack.length - 3}`}
                            size="small"
                            sx={{ backgroundColor: "rgba(0, 0, 0, 0.08)", fontWeight: 500 }}
                          />
                        )}
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
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          onClick={(e) => handleEdit(post.postId, e)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => openDeleteDialog(post, e)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 6, mb: 4 }} />
          </Box>
        )}

        {/* Search Results Title */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {searchTerm
              ? `Search Results for "${searchTerm}" (${filteredPosts.length})`
              : `All Available Positions (${filteredPosts.length})`}
          </Typography>
          {!isMobile && (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate("/create")}>
              Post a Job
            </Button>
          )}
        </Box>

        {/* Job Listings */}
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
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleJobCardClick(post.postId)}
                >
                  <Box sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                        {post.postProfile}
                      </Typography>
                      {isNewPost() && (
                        <Badge color="secondary" badgeContent=" " variant="dot" sx={{ mr: 1 }}>
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              backgroundColor: "rgba(156, 39, 176, 0.08)",
                              color: "secondary.main",
                              fontWeight: 500,
                            }}
                          />
                        </Badge>
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {post.reqExperience}
                      </Box>{" "}
                      years experience required
                    </Typography>

                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        mb: 3,
                        color: "text.secondary",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
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
                            fontWeight: 500,
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
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => handleEdit(post.postId, e)}
                        sx={{ color: "primary.main" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => openDeleteDialog(post, e)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 8,
                  textAlign: "center",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  border: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No job postings found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {searchTerm ? "Try a different search term" : "Add your first job posting"}
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/create")}>
                  Post a Job
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          elevation: 5,
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the job posting for "{postToDelete?.postProfile}"? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeDeleteDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AllPosts