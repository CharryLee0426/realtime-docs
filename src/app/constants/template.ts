export const templates = [
    {
        id: "blank", 
        label: "Blank Document", 
        imageUrl: "/blank-document.svg",
        initicialContent: ``,
    },
    {
        id: "software-proposal", 
        label: "Software development proposal", 
        imageUrl: "/software-proposal.svg",
        initicialContent: `
        <h1 style="text-align: center;">Software Development Proposal</h1>
        <p style="text-align: center; font-style: italic;">Prepared by: [Your Name or Company]</p>
        <p style="text-align: center; font-style: italic;">Date: [Insert Date]</p>

        <h2>Introduction</h2>
        <p>
            This proposal outlines the software development services to be provided by [Your Company/Name] to [Client's Name/Organization]. 
            The goal is to deliver a [briefly describe the type of software, e.g., "custom web application"] tailored to meet the client's requirements.
        </p>

        <h2>Objectives</h2>
        <ul>
            <li>Develop a [describe the main functionality, e.g., "user-friendly web application for task management"].</li>
            <li>Ensure scalability, security, and maintainability of the software.</li>
            <li>Deliver a high-quality product within the agreed timeline and budget.</li>
        </ul>

        <h2>Scope of Work</h2>
        <p>The project scope includes the following:</p>
        <ul>
            <li>Requirement gathering and analysis.</li>
            <li>UI/UX design and prototyping.</li>
            <li>Development and testing of the software.</li>
            <li>Deployment and post-deployment support.</li>
        </ul>

        <h2>Timeline</h2>
        <p>The proposed timeline for the project is as follows:</p>
        <table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
            <tr>
                <th style="text-align: left;">Phase</th>
                <th style="text-align: left;">Duration</th>
                <th style="text-align: left;">Completion Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Requirement Analysis</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Design</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Development</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Testing</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Deployment</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            </tbody>
        </table>

        <h2>Pricing</h2>
        <p>The total cost for the project is estimated to be <strong>[Insert amount]</strong>.</p>
        <p>Payment terms:</p>
        <ul>
            <li>[e.g., "50% upfront and 50% upon completion"].</li>
            <li>[Include any other payment-related terms].</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
            We look forward to collaborating with [Client's Name/Organization] on this project. If you have any questions or need further details, 
            please feel free to contact us at [Insert Contact Information].
        </p>

        <p style="font-weight: bold;">Thank you,</p>
        <p>[Your Name or Company]</p>
        `,
    },
    {
        id: "project-proposal", 
        label: "Project proposal", 
        imageUrl: "/project-proposal.svg",
        initicialContent: `
        <h1 style="text-align: center;">Project Proposal</h1>
        <p style="text-align: center; font-style: italic;">Prepared by: [Your Name or Organization]</p>
        <p style="text-align: center; font-style: italic;">Date: [Insert Date]</p>

        <h2>Executive Summary</h2>
        <p>
            This proposal outlines the plan and objectives for the project titled <strong>[Insert Project Title]</strong>. 
            The project aims to achieve [briefly state the goal or purpose of the project]. This document provides a detailed overview 
            of the project's objectives, scope, deliverables, and timeline.
        </p>

        <h2>Objectives</h2>
        <ul>
            <li>Clearly define the project's goals and deliverables.</li>
            <li>Provide a roadmap for achieving the desired outcomes.</li>
            <li>Outline key performance indicators for measuring success.</li>
        </ul>

        <h2>Scope</h2>
        <p>The scope of this project includes:</p>
        <ul>
            <li>[List key activities or deliverables, e.g., "Research and data collection"].</li>
            <li>[e.g., "Development of a prototype"].</li>
            <li>[e.g., "Final presentation and project report"].</li>
        </ul>

        <h2>Methodology</h2>
        <p>The project will be executed using the following approach:</p>
        <ul>
            <li><strong>Phase 1:</strong> [Describe the first phase, e.g., "Planning and requirement analysis"].</li>
            <li><strong>Phase 2:</strong> [Describe the second phase, e.g., "Design and development"].</li>
            <li><strong>Phase 3:</strong> [Describe the third phase, e.g., "Implementation and testing"].</li>
            <li><strong>Phase 4:</strong> [Describe the final phase, e.g., "Final delivery and review"].</li>
        </ul>

        <h2>Timeline</h2>
        <p>The proposed timeline for the project is as follows:</p>
        <table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
            <tr>
                <th style="text-align: left;">Phase</th>
                <th style="text-align: left;">Duration</th>
                <th style="text-align: left;">Completion Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Planning</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Design</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Development</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Testing</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            <tr>
                <td>Delivery</td>
                <td>[Insert duration]</td>
                <td>[Insert completion date]</td>
            </tr>
            </tbody>
        </table>

        <h2>Budget</h2>
        <p>The estimated budget for the project is <strong>[Insert amount]</strong>.</p>
        <p>The cost breakdown is as follows:</p>
        <ul>
            <li>[e.g., "Research and materials: $X"].</li>
            <li>[e.g., "Development: $Y"].</li>
            <li>[e.g., "Testing and quality assurance: $Z"].</li>
        </ul>

        <h2>Risks and Mitigation</h2>
        <p>The following risks have been identified along with mitigation strategies:</p>
        <ul>
            <li><strong>[Risk 1]:</strong> [Description and mitigation plan].</li>
            <li><strong>[Risk 2]:</strong> [Description and mitigation plan].</li>
            <li><strong>[Risk 3]:</strong> [Description and mitigation plan].</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
            This proposal provides a comprehensive plan for the successful execution of the <strong>[Insert Project Title]</strong>. 
            We look forward to collaborating with [Client/Stakeholders] to achieve the desired outcomes. Please feel free to contact us 
            for further details or clarifications.
        </p>

        <p style="font-weight: bold;">Thank you,</p>
        <p>[Your Name or Organization]</p>
        `,
    },
    {
        id: "business-letter", 
        label: "Business letter", 
        imageUrl: "/business-letter.svg",
        initicialContent: `
        <p style="text-align: right;">[Your Address or Company Address]</p>
        <p style="text-align: right;">[City, State, ZIP Code]</p>
        <p style="text-align: right;">[Date]</p>

        <p>[Recipient's Name]</p>
        <p>[Recipient's Title or Position]</p>
        <p>[Recipient's Company Name]</p>
        <p>[Recipient's Address]</p>
        <p>[City, State, ZIP Code]</p>

        <h2>Subject: [Insert Subject of the Letter]</h2>

        <p>Dear [Recipient's Name],</p>

        <p>
            I am writing to [state the purpose of the letter, e.g., "introduce our new product line," "request a meeting," or "follow up on our previous correspondence"]. 
            [Provide a brief introduction and context for the letter, if needed].
        </p>

        <h3>Main Body</h3>
        <p>
            [Provide detailed information about the purpose of the letter. Include any necessary background, key points, and details. If making a request, explain why it’s important or beneficial.]
        </p>
        <p>
            [Include any supporting data, examples, or additional context to strengthen your message. Use clear, concise language.]
        </p>

        <h3>Closing Remarks</h3>
        <p>
            I hope to [mention the desired outcome, e.g., "schedule a meeting to discuss this further," "hear back from you with your feedback," or "move forward with this opportunity"]. 
            Please feel free to contact me at [Insert Contact Information] if you have any questions or need additional information.
        </p>

        <p>Thank you for your time and attention.</p>

        <p>Sincerely,</p>
        <p>[Your Full Name]</p>
        <p>[Your Position/Title]</p>
        <p>[Your Company Name, if applicable]</p>
        <p>[Your Contact Information]</p>
        `,
    },
    {
        id: "resume", 
        label: "Resume", 
        imageUrl: "/resume.svg",
        initicialContent: `
        <h1 style="text-align: center;">[Your Full Name]</h1>
        <p style="text-align: center;">
            [Your Address] | [City, State, ZIP Code] | [Your Phone Number] | [Your Email Address] | [LinkedIn Profile] | [Portfolio Website]
        </p>

        <h2>Professional Summary</h2>
        <p>
            [Provide a concise summary of your professional experience, skills, and career objectives. 
            Highlight your key strengths and what makes you a strong candidate for the role.]
        </p>

        <h2>Work Experience</h2>
        <div>
            <h3>[Job Title]</h3>
            <p><strong>[Company Name]</strong> | [City, State] | [Start Date] – [End Date]</p>
            <ul>
            <li>[Describe your key responsibilities, achievements, or contributions in this role.]</li>
            <li>[Use bullet points for clarity and focus on quantifiable results if possible.]</li>
            </ul>
        </div>
        <div>
            <h3>[Job Title]</h3>
            <p><strong>[Company Name]</strong> | [City, State] | [Start Date] – [End Date]</p>
            <ul>
            <li>[Describe your key responsibilities, achievements, or contributions in this role.]</li>
            <li>[Focus on accomplishments that demonstrate your skills and experience relevant to the target role.]</li>
            </ul>
        </div>

        <h2>Education</h2>
        <div>
            <h3>[Degree or Certificate]</h3>
            <p><strong>[School Name]</strong> | [City, State] | [Graduation Date]</p>
            <p>[Include relevant coursework, honors, or extracurricular activities, if applicable.]</p>
        </div>

        <h2>Skills</h2>
        <ul>
            <li>[Skill 1]</li>
            <li>[Skill 2]</li>
            <li>[Skill 3]</li>
            <li>[Skill 4]</li>
            <li>[Skill 5]</li>
        </ul>

        <h2>Certifications</h2>
        <ul>
            <li><strong>[Certification Name]</strong> – [Issuing Organization], [Year]</li>
            <li><strong>[Certification Name]</strong> – [Issuing Organization], [Year]</li>
        </ul>

        <h2>Projects</h2>
        <div>
            <h3>[Project Title]</h3>
            <p><strong>[Short Description]</strong></p>
            <ul>
            <li>[Highlight the purpose, tools/technologies used, and outcomes of the project.]</li>
            <li>[If applicable, link to the project or portfolio: <a href="[Link URL]">View Project</a>]</li>
            </ul>
        </div>

        <h2>References</h2>
        <p>[Available upon request.]</p>
        `,
    },
    {
        id: "cover-letter", 
        label: "Cover letter", 
        imageUrl: "/cover-letter.svg",
        initicialContent: `
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State, ZIP Code]</p>
        <p>[Your Email Address]</p>
        <p>[Your Phone Number]</p>
        <p>[Date]</p>

        <p>[Recipient's Name]</p>
        <p>[Recipient's Job Title]</p>
        <p>[Company Name]</p>
        <p>[Company Address]</p>
        <p>[City, State, ZIP Code]</p>

        <h2>Subject: Application for [Job Title]</h2>

        <p>Dear [Recipient's Name or Hiring Manager],</p>

        <h3>Introduction</h3>
        <p>
            I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [Job Board or Company Website]. 
            With my background in [Your Field or Industry], combined with [specific skills or experience], I am confident in my ability 
            to contribute to your team and help achieve [Company's Mission or Goals].
        </p>

        <h3>Why I Am a Good Fit</h3>
        <p>
            In my previous role as a [Your Previous Job Title] at [Previous Company Name], I successfully [describe a significant accomplishment or responsibility]. 
            This experience honed my skills in [relevant skill/area, e.g., "project management, problem-solving, and cross-functional collaboration"]. 
            Furthermore, my proficiency in [specific tools, technologies, or methodologies] has allowed me to [specific achievement or contribution].
        </p>
        <p>
            At [Company Name], I am particularly drawn to [specific aspect of the company, such as its culture, mission, or recent projects]. 
            I believe my experience and passion for [related industry or job function] align well with your goals, particularly in [mention a specific company objective or challenge you can help address].
        </p>

        <h3>Closing</h3>
        <p>
            I am excited about the opportunity to bring my skills and experience to [Company Name] and contribute to your team’s success. 
            I would welcome the chance to discuss how my background aligns with the [Job Title] role. 
            Please feel free to contact me at [Your Phone Number] or [Your Email Address] to schedule an interview at your earliest convenience.
        </p>

        <p>Thank you for considering my application. I look forward to the opportunity to contribute to [Company Name]'s success.</p>

        <p>Sincerely,</p>
        <p>[Your Full Name]</p>
        `,
    },
    {
        id: "letter", 
        label: "Letter", 
        imageUrl: "/letter.svg",
        initicialContent: `
        
        `,
    },
];