function ProgressBar({completedCount,totalTargets,progressPercentage}){
return(
    <div>
        <p>
            Progress:{completedCount}/{totalTargets} ({progressPercentage}%)
        </p>
        <div className="progress-bar">
        <div 
           className="progress-fill"
           style={{ width: `${progressPercentage}%` }}
           ></div>
        </div>
    </div>
)
}
export default ProgressBar