package org.example.jobrest;

import org.example.jobrest.Service.JobService;
import org.example.jobrest.model.JobPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class JobRestController {

    @Autowired
    private JobService jobService;

    @GetMapping(path="jobPosts",produces = {"application/json"})
    public List<JobPost> getAllJobs() {
        return jobService.getAllJobs();
    }
    @PutMapping("jobPost")
    public JobPost updatejob(@RequestBody JobPost jobPost) {
        jobService.updatejob(jobPost);
        return jobService.getJob(jobPost.getPostId());
    }

    @PostMapping("jobPost")
    public JobPost addJob(@RequestBody JobPost jobPost) {
        jobService.addJob(jobPost);
        return jobService.getJob(jobPost.getPostId());
    }

    @DeleteMapping("jobPost/{postId}")
    public String deleteJob(@PathVariable int postId)
    {
        jobService.deleteJob(postId);
        return "Job deleted";

    }

    @GetMapping("jobPost/{postId}")
    public JobPost getJob(@PathVariable("postId") int postId) {
        return jobService.getJob(postId);
    }
}
