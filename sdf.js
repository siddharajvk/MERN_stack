function createApplication(projectID, userID) {
    if (!db) {
        console.log("Database not initialized");
        return;
    }
    
    const ongoingProjects = db.collection('ongoingProjects');
    ongoingProjects.find({ projectID: projectID }, (err, project) => {
        if (err) {
            console.log(err);
            console.log("Error finding project");
        } else {
            const applications = db.collection('applications');
            applications.insertOne({
                projectID: projectID,
                applierID: userID,
                creatorID: project.userID,
            });
            console.log("Application created");
        }
    });
}