export default function RightPanel() {
  return (
    <div className="right-panel">
      <div className="right-panel-greeting">
        <h2>Hi, I&apos;m <em>Rex.</em></h2>
        <p>
          I help teams stop doing manually what a good script can handle in seconds.
        </p>
      </div>
      <div className="right-panel-section">
        <h3>What I build</h3>
        <ul className="right-panel-list">
          <li>Spreadsheets that fetch live data on a schedule and format it automatically</li>
          <li>Bulk update systems that push hundreds of rows in one click</li>
          <li>Auto-generated reports that land in your inbox without anyone touching a keyboard</li>
          <li>Browser extensions that scrape, fill, or click through repetitive web tasks</li>
          <li>PowerShell scripts that run maintenance, backups, or file cleanup on a timer</li>
          <li>Google Sheets dashboards that pull from external APIs in real time</li>
          <li>Form-to-spreadsheet pipelines that capture and organize submissions automatically</li>
          <li>App-to-app connectors that move data between systems without manual exports</li>
          <li>Notification systems that alert your team when something changes in a spreadsheet</li>
          <li>Scheduled scripts that rename, move, or organize files across your folders automatically</li>
          <li>Lightweight web apps, websites, dashboards, and portals your team can actually use</li>
          <li>Automating Excel and CSV cleanup and processing, sorting, formatting, and ready to submit</li>
        </ul>
      </div>
      <div className="right-panel-section">
        <h3>Why me</h3>
        <div className="right-panel-why">
          <p>
            I specialize in the small, painful, daily stuff. The spreadsheet
            someone updates manually every morning, the report that takes 3 hours
            to compile, the file that needs cleaning before it can go anywhere.
          </p>
          <p>
            Problems that do not need a $10,000 solution. Just someone who
            knows how to fix them.
          </p>
          <em>Fair price. Clean build. No overkill.</em>
        </div>
      </div>
      
        <a href="https://www.fiverr.com/rexsumpio"
        className="right-panel-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Find me on Fiverr
      </a>
    </div>
  )
}
