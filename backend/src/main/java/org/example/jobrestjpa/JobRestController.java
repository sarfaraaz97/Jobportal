package org.example.jobrestjpa;

import org.example.jobrestjpa.Service.JobService;
import org.example.jobrestjpa.model.JobPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class JobRestController {

    @Autowired
    private JobService jobService;

    @GetMapping(path = "jobPosts")
    public List<JobPost> getAllJobs() {

        return jobService.getAllJobs();
    }
    @GetMapping("jobPosts/keyword/{keyword}")
    public List<JobPost>search(@PathVariable("keyword") String keyword)
    {
        return jobService.search(keyword);
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
    public String deleteJob(@PathVariable int postId) {
        jobService.deleteJob(postId);
        return "Job deleted";
    }

    @GetMapping("jobPost/{postId}")
    public JobPost getJob(@PathVariable("postId") int postId) {
        return jobService.getJob(postId);
    }

    @GetMapping("load")
    public String loadJobs() {
        jobService.load();
        return "Jobs loaded";
    }
}