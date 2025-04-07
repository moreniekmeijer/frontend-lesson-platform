function MaterialPage() {
    return (
        <section className="material-page">
            <video controls width="600">
                <source src="http://localhost:8080/materials/1/file" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </section>

    )
}

export default MaterialPage;