package org.example.jobrest.Service;

import org.example.jobrest.Repo.JobRepository;
import org.example.jobrest.model.JobPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class JobService {
    @Autowired
    public JobRepository jobRepository;

    public void addJob(JobPost jobPost) {
        jobRepository.addJob(jobPost);

    }

    public List<JobPost> getAllJobs() {
        return jobRepository.getAllJobs();


    }

    public JobPost getJob(int postId) {
        return jobRepository.getJob(postId);
    }

    public void updatejob(JobPost jobPost) {
        jobRepository.updatejob(jobPost);
    }

    public void deleteJob(int postId) {
        jobRepository.deleteJob(postId);
    }
}
