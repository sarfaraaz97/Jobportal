"use client"

import { useEffect, useState } from "react"
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Skeleton,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import WorkIcon from "@mui/icons-material/Work"

const Edit = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    postId: "",
    postProfile: "",
    reqExperience: 0,
    postTechStack: [],
    postDesc: "",
  })
  const [currId] = useState(location.state?.id)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
    { name: "React" },
    { name: "Node.js" },
    { name: "TypeScript" },
  ]

  useEffect(() => {
    const fetchJobPost = async () => {
      if (!currId) {
        navigate("/")
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:8080/jobPost/${currId}`)
        setForm(response.data)
      } catch (error) {
        console.error("Error fetching job post:", error)
        setSnackbar({
          open: true,
          message: "Error loading job post. Please try again.",
          severity: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobPost()
  }, [currId, navigate])

  const validate = () => {
    const newErrors = {}

    if (!form.postProfile.trim()) {
      newErrors.postProfile = "Job profile is required"
    }

    if (form.reqExperience < 0) {
      newErrors.reqExperience = "Experience must be a positive number"
    }

    if (!form.postDesc.trim()) {
      newErrors.postDesc = "Job description is required"
    } else if (form.postDesc.trim().length < 10) {
      newErrors.postDesc = "Description must be at least 10 characters"
    }

    if (form.postTechStack.length === 0) {
      newErrors.postTechStack = "Select at least one skill"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Use PUT method for updating job posts
      await axios.put("http://localhost:8080/jobPost", form)
      setSnackbar({
        open: true,
        message: "Job posting updated successfully!",
        severity: "success",
      })

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (error) {
      console.error(error)
      setSnackbar({
        open: true,
        message: "Error updating job posting. Please try again.",
        severity: "error",
      })
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSkillChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setForm({ ...form, postTechStack: [...form.postTechStack, value] })
    } else {
      setForm({
        ...form,
        postTechStack: form.postTechStack.filter((skill) => skill !== value),
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <CardHeader
            title={<Skeleton width="60%" height={40} />}
            subheader={<Skeleton width="40%" />}
            sx={{
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              borderBottom: 1,
              borderColor: "divider",
            }}
          />

          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {[...Array(5)].map((_, index) => (
                <Grid item xs={12} key={index}>
                  <Skeleton height={index === 2 ? 120 : 60} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WorkIcon color="primary" />
              <Typography variant="h5" component="h1">
                Edit Job Posting
              </Typography>
            </Box>
          }
          subheader="Update the details for this job posting"
          sx={{
            backgroundColor: "rgba(25, 118, 210, 0.04)",
            borderBottom: 1,
            borderColor: "divider",
          }}
        />

        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Post ID"
                  name="postId"
                  value={form.postId}
                  disabled
                  helperText="Post ID cannot be changed"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Profile"
                  name="postProfile"
                  value={form.postProfile}
                  onChange={handleChange}
                  error={!!errors.postProfile}
                  helperText={errors.postProfile || "The title of the position you're hiring for"}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Required Experience (years)"
                  name="reqExperience"
                  value={form.reqExperience}
                  onChange={handleChange}
                  error={!!errors.reqExperience}
                  helperText={errors.reqExperience || "The minimum years of experience required"}
                  InputProps={{ inputProps: { min: 0 } }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Job Description"
                  name="postDesc"
                  value={form.postDesc}
                  onChange={handleChange}
                  error={!!errors.postDesc}
                  helperText={errors.postDesc || "Describe the role, responsibilities, and requirements"}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.postTechStack} required sx={{ width: "100%" }}>
                  <FormLabel component="legend">Required Skills</FormLabel>
                  <FormGroup sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      {skillSet.map((skill, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={form.postTechStack.includes(skill.name)}
                                onChange={handleSkillChange}
                                value={skill.name}
                                color="primary"
                              />
                            }
                            label={skill.name}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                  {errors.postTechStack && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.postTechStack}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" onClick={() => navigate("/")} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Edit