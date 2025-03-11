import "./ContentHeader.css"

const ContentHeader =({title,paragraph})=>{
    return(
        <div className="content-header">
            <h1>{title}</h1>
            <p>{paragraph}</p>
        </div>
    );
};

export default ContentHeader;