import "./MoreVideosTile.css"

function MoreVideosTile(props) {
    return (
        <div className="moreVideosTile">
            <h3>{props.description}</h3>
            <span>
                <video width="244" height="192" controls>
                <source src="https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <video width="244" height="192" controls>
                <source src="https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <video width="244" height="192" controls>
                <source src="https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <video width="244" height="192" controls>
                <source src="https://www.youtube.com/watch?v=DqZX8m2T-e0&t=193s" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </span>
        </div>
    )
}

export default MoreVideosTile;