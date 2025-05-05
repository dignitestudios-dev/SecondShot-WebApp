import jsPDF from "jspdf";
import "jspdf-autotable";
import Rookieaward from "../assets/rookieaward.png";
import PlaybookAward from "../assets/playbookAward.png";
import GameTime from "../assets/gameTime.png";
import ChampionAward from "../assets/championAward.png";
import FameAward from "../assets/fameAward.png";

/**
 * Creates a PDF document with transferable skills and resume data
 * @param {Object} getSkill - The transferable skills data from the API
 * @param {Object} resume - The resume data from the API
 * @returns {Object} - The generated PDF document
 */
const awardImages = [
  Rookieaward,
  GameTime,
  PlaybookAward,
  ChampionAward,
  FameAward,
];

export function createPDFWithUserDataAndResume(userData, resume, idpData) {
  console.log("userData--> ", userData);
  console.log("resume--> ", resume);
  console.log("idpData--> ", idpData);

  // Define PDF dimensions
  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = 297; // A4 height in mm
  const leftMargin = 20;
  const rightMargin = 20;
  const maxLineWidth = pdfWidth - leftMargin - rightMargin;

  // Create new PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [pdfWidth, pdfHeight],
  });

  // Set initial position for content
  let yPosition = 20;

  // Helper function to wrap text and return new Y position
  const wrapText = (text, x, y, maxWidth, lineHeight) => {
    if (!text) return y;

    // Split the text into words
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth =
        (pdf.getStringUnitWidth(testLine) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;

      if (testWidth > maxWidth && i > 0) {
        pdf.text(line.trim(), x, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }

    // Print the last line
    if (line.trim() !== "") {
      pdf.text(line.trim(), x, currentY);
      currentY += lineHeight;
    }

    return currentY;
  };

  // Helper function to add section title with underline
  const addSectionTitle = (title, y) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(title.toUpperCase() || "UNTITLED SECTION", leftMargin, y);

    // Add horizontal line below the title
    y += 2;
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.line(leftMargin, y, pdfWidth - rightMargin, y);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    return y + 6;
  };

  // Helper function to add a numbered list item with subitems
  const addListItem = (number, text, y, subitems = []) => {
    pdf.text(`${number}. ${text || "No title"}`, leftMargin, y);
    let currentY = y + 6;

    if (Array.isArray(subitems)) {
      subitems.forEach((item, index) => {
        if (item) {
          const letter = String.fromCharCode(97 + index); // a, b, c, ...
          const description =
            item.description ||
            (typeof item === "string" ? item : "No description available");

          // Initial position for the prefix (a., b., etc)
          pdf.text(`    ${letter}.`, leftMargin, currentY);

          // Calculate indent for the wrapped text (prefix width)
          const prefixWidth =
            (pdf.getStringUnitWidth(`    ${letter}. `) *
              pdf.internal.getFontSize()) /
            pdf.internal.scaleFactor;
          const indentedX = leftMargin + prefixWidth;
          const indentedMaxWidth = maxLineWidth - prefixWidth;

          // Position for the start of the description text
          const descStartY = currentY;

          // Wrap and draw the description text with proper indentation
          currentY = wrapText(
            description,
            indentedX,
            descStartY,
            indentedMaxWidth,
            6
          );
        }
      });
    }

    return currentY;
  };

  // Check if we need a new page
  const checkPageBreak = (currentY) => {
    if (currentY > 270) {
      pdf.addPage();
      return 20; // Reset Y position to top of page with margin
    }
    return currentY;
  };

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("  (IDP)", leftMargin, yPosition);
  yPosition += 10;
  // Check if idpData exists and has data array
  if (
    idpData &&
    idpData.data &&
    Array.isArray(idpData.data) &&
    idpData.data.length > 0
  ) {
    // Process each question-answer pair
    idpData.data.forEach((item, index) => {
      if (item && item.question) {
        yPosition = checkPageBreak(yPosition);

        // Add placeholder image before each question (40x40mm square)
        const imageSize = 20;
        const currentImage = awardImages[index] || Rookieaward; // fallback

        // Draw the image
        pdf.addImage(
          currentImage,
          "PNG", // or 'JPEG' depending on the format
          leftMargin,
          yPosition,
          imageSize,
          imageSize
        );
        // Add image border
        // pdf.setDrawColor(100, 100, 100); // Darker gray for border
        // pdf.setLineWidth(0.5);
        // pdf.rect(leftMargin, yPosition, imageSize, imageSize, 'S');

        // // Add image icon (simple drawing in the center of placeholder)
        // pdf.setDrawColor(80, 80, 80);
        // pdf.setLineWidth(0.8);

        // // Draw a simple icon inside the placeholder (e.g., document icon)
        // const iconMargin = 5;
        // pdf.line(
        //   leftMargin + iconMargin,
        //   yPosition + iconMargin,
        //   leftMargin + imageSize - iconMargin,
        //   yPosition + iconMargin
        // );
        // pdf.line(
        //   leftMargin + iconMargin,
        //   yPosition + imageSize/2,
        //   leftMargin + imageSize - iconMargin,
        //   yPosition + imageSize/2
        // );
        // pdf.line(
        //   leftMargin + iconMargin,
        //   yPosition + imageSize - iconMargin,
        //   leftMargin + imageSize - iconMargin,
        //   yPosition + imageSize - iconMargin
        // );

        // Position text to the right of the image
        const textX = leftMargin + imageSize + 5;
        const questionWidth = maxLineWidth - imageSize - 5;

        // Question number
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text(`Question ${index + 1}:`, textX, yPosition + 6);

        // Question text
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        yPosition = wrapText(
          item.question.question || "No question available",
          textX,
          yPosition + 12,
          questionWidth,
          6
        );

        yPosition += 6;

        // Answer section
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text("Answer:", textX, yPosition);
        yPosition += 6;

        // Format the answer based on its type
        pdf.setFont("helvetica", "normal");

        if (item.answer === null || item.answer === undefined) {
          pdf.text("No answer provided.", textX, yPosition);
          yPosition += 6;
        } else if (Array.isArray(item.answer)) {
          // Handle array of answers (bullets)
          item.answer.forEach((ans, i) => {
            if (ans) {
              pdf.text("•", textX, yPosition);
              yPosition = wrapText(
                ans,
                textX + 5,
                yPosition,
                questionWidth - 5,
                6
              );
              yPosition += 2;
            }
          });
        } else {
          // Handle single answer
          yPosition = wrapText(
            item.answer.toString(),
            textX,
            yPosition,
            questionWidth,
            6
          );
        }
        yPosition += 15;
        yPosition = checkPageBreak(yPosition);
      }
    });
  } else {
    // No IDP data available
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("No  data available.", leftMargin, yPosition);
    yPosition += 10;
  }
  // Add PDF title


  yPosition = 20;

  yPosition = addSectionTitle("USER PROFILE", yPosition);
  yPosition += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(" Resume", leftMargin, yPosition);
  yPosition += 10;
  // PART 2: Add Resume data
  // Get the first resume from the array if resume is an array
  const resumeData = Array.isArray(resume) ? resume[0] : resume;

  if (resumeData) {
    // Personal Information - Large centered name
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    const nameText = resumeData.full_name || "Name Not Provided";
    // Center the name
    const nameWidth =
      (pdf.getStringUnitWidth(nameText) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const nameX = (pdfWidth - nameWidth) / 2;
    pdf.text(nameText, nameX, yPosition);
    yPosition += 10;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    // Contact information - centered
    let contactInfo = [];
    if (resumeData.email) contactInfo.push(resumeData.email);
    if (resumeData.phone) contactInfo.push(`+1 ${resumeData.phone}`);
    if (resumeData.address) contactInfo.push(resumeData.address);

    if (contactInfo.length > 0) {
      const contactText = contactInfo.join("  ");
      const contactWidth =
        (pdf.getStringUnitWidth(contactText) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const contactX = (pdfWidth - contactWidth) / 2;
      pdf.text(contactText, contactX, yPosition);
      yPosition += 12;
    }

    // Professional Objective
    if (resumeData.objective && resumeData.objective.description) {
      yPosition = addSectionTitle("Objective", yPosition);
      yPosition += 4;
      yPosition = wrapText(
        resumeData.objective.description,
        leftMargin,
        yPosition,
        maxLineWidth,
        6
      );
      yPosition += 10;
      yPosition = checkPageBreak(yPosition);
    }

    // Work Experience
    if (
      resumeData.experience &&
      Array.isArray(resumeData.experience) &&
      resumeData.experience.length > 0
    ) {
      yPosition = addSectionTitle("Work Experience", yPosition);
      yPosition += 4;

      resumeData.experience.forEach((job) => {
        if (job) {
          // Company name on left, date on right
          pdf.setFont("helvetica", "bold");
          pdf.text(
            job.company || "Company Not Provided",
            leftMargin,
            yPosition
          );

          // Format and right-align dates
          if (job.start_date || job.end_date) {
            const startYear = job.start_date
              ? new Date(job.start_date).getFullYear()
              : "";
            const endDate = job.end_date
              ? new Date(job.end_date).getFullYear()
              : "Present";
            const dateRange = `${startYear} - ${endDate}`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;

          // Job title
          pdf.setFont("helvetica", "bold");
          pdf.text(
            job.job_title || "Position Not Provided",
            leftMargin,
            yPosition
          );
          yPosition += 6;

          // Job description with indentation
          if (job.description) {
            pdf.setFont("helvetica", "normal");
            const descLines = job.description.split(/\r?\n/);

            // Add description with proper indentation
            descLines.forEach((line) => {
              if (line.trim()) {
                // Skip empty lines
                yPosition = wrapText(
                  line,
                  leftMargin + 8,
                  yPosition,
                  maxLineWidth - 8,
                  6
                );
              }
            });
          }

          yPosition += 8;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Education
    if (
      resumeData.education &&
      Array.isArray(resumeData.education) &&
      resumeData.education.length > 0
    ) {
      yPosition = addSectionTitle("Education", yPosition);
      yPosition += 4;

      resumeData.education.forEach((edu) => {
        if (edu) {
          // Left side: Institution name
          pdf.setFont("helvetica", "bold");
          pdf.text(
            edu.institution || "Institution Not Provided",
            leftMargin,
            yPosition
          );

          // Right side: Date range
          if (edu.start_year || edu.end_year) {
            const dateRange = `${edu.start_year || ""} - ${
              edu.end_year || "Present"
            }`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;

          // Degree with bullet
          if (edu.degree) {
            pdf.setFont("helvetica", "normal");
            pdf.text("•", leftMargin + 3, yPosition);
            yPosition = wrapText(
              edu.degree,
              leftMargin + 8,
              yPosition,
              maxLineWidth - 8,
              6
            );
          }

          // Field of study with bullet if provided
          if (edu.field_of_study) {
            pdf.text("•", leftMargin + 3, yPosition);
            yPosition = wrapText(
              edu.field_of_study,
              leftMargin + 8,
              yPosition,
              maxLineWidth - 8,
              6
            );
          }

          yPosition += 8;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Combined Skills section
    if (
      (resumeData.soft_skills && resumeData.soft_skills.length > 0) ||
      (resumeData.technical_skills && resumeData.technical_skills.length > 0)
    ) {
      yPosition = addSectionTitle("Skills", yPosition);
      yPosition += 4;

      // Soft Skills
      if (
        resumeData.soft_skills &&
        Array.isArray(resumeData.soft_skills) &&
        resumeData.soft_skills.length > 0
      ) {
        pdf.setFont("helvetica", "bold");
        pdf.text("Soft Skills", leftMargin, yPosition);
        yPosition += 6;

        pdf.setFont("helvetica", "normal");
        resumeData.soft_skills.forEach((skill, index) => {
          if (skill) {
            const bulletX = leftMargin + 3;
            const textX = leftMargin + 8;

            pdf.text("•", bulletX, yPosition);
            pdf.text(skill, textX, yPosition);
            yPosition += 5;
          }
        });
        yPosition += 3;
      }

      // Technical Skills
      if (
        resumeData.technical_skills &&
        Array.isArray(resumeData.technical_skills) &&
        resumeData.technical_skills.length > 0
      ) {
        pdf.setFont("helvetica", "bold");
        pdf.text("Technical Skills", leftMargin, yPosition);
        yPosition += 6;

        pdf.setFont("helvetica", "normal");
        resumeData.technical_skills.forEach((skill, index) => {
          if (skill) {
            const bulletX = leftMargin + 3;
            const textX = leftMargin + 8;

            pdf.text("•", bulletX, yPosition);
            pdf.text(skill, textX, yPosition);
            yPosition += 5;
          }
        });
      }

      yPosition += 5;
      yPosition = checkPageBreak(yPosition);
    }

    // Certifications
    if (
      resumeData.licenses_and_certifications &&
      Array.isArray(resumeData.licenses_and_certifications) &&
      resumeData.licenses_and_certifications.length > 0
    ) {
      yPosition = addSectionTitle("Certifications", yPosition);
      yPosition += 4;

      resumeData.licenses_and_certifications.forEach((cert) => {
        if (cert) {
          // Bullet point
          pdf.setFont("helvetica", "normal");
          pdf.text("•", leftMargin, yPosition);

          // Certification name
          pdf.setFont("helvetica", "bold");
          pdf.text(
            cert.certification_name || "Certification Not Provided",
            leftMargin + 5,
            yPosition
          );

          // Format and right-align dates
          if (cert.issue_date || cert.expiration_date) {
            const issueYear = cert.issue_date
              ? new Date(cert.issue_date).getFullYear()
              : "";
            const expirationYear = cert.expiration_date
              ? new Date(cert.expiration_date).getFullYear()
              : "";
            const dateRange = `${issueYear} - ${expirationYear}`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;
          yPosition = checkPageBreak(yPosition);
        }
      });

      yPosition += 4;
    }

    // Honors and Awards
    if (
      resumeData.honors_and_awards &&
      Array.isArray(resumeData.honors_and_awards) &&
      resumeData.honors_and_awards.length > 0
    ) {
      yPosition = addSectionTitle("Honors", yPosition);
      yPosition += 4;

      resumeData.honors_and_awards.forEach((award) => {
        if (award) {
          // Bullet point
          pdf.setFont("helvetica", "normal");
          pdf.text("•", leftMargin, yPosition);

          // Award name
          pdf.setFont("helvetica", "bold");
          pdf.text(
            award.award_name || "Award Not Provided",
            leftMargin + 5,
            yPosition
          );

          // Format and right-align date
          if (award.date_Received) {
            const year = new Date(award.date_Received).getFullYear();
            const dateWidth =
              (pdf.getStringUnitWidth(year.toString()) *
                pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(
              year.toString(),
              pdfWidth - rightMargin - dateWidth,
              yPosition
            );
          }

          yPosition += 6;

          // Organization if provided (indented)
          if (award.awarding_organization) {
            pdf.setFont("helvetica", "normal");
            pdf.text(award.awarding_organization, leftMargin + 5, yPosition);
            yPosition += 6;
          }

          if (award.description && award.description.trim()) {
            yPosition = wrapText(
              award.description,
              leftMargin + 5,
              yPosition,
              maxLineWidth - 5,
              6
            );
            yPosition += 2;
          }

          yPosition += 4;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Volunteer Experience
    if (
      resumeData.volunteer_experience &&
      Array.isArray(resumeData.volunteer_experience) &&
      resumeData.volunteer_experience.length > 0
    ) {
      yPosition = addSectionTitle("Volunteer Service", yPosition);
      yPosition += 4;

      resumeData.volunteer_experience.forEach((exp) => {
        if (exp) {
          // Organization name on left, date on right
          pdf.setFont("helvetica", "bold");
          pdf.text(
            exp.organization_name || "Organization Not Provided",
            leftMargin,
            yPosition
          );

          // Format and right-align dates
          if (exp.start_year || exp.end_year) {
            const dateRange = `${exp.start_year || ""} - ${
              exp.end_year || "Present"
            }`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;

          // Role or position if provided
          if (exp.role) {
            pdf.setFont("helvetica", "bold");
            pdf.text(exp.role, leftMargin, yPosition);
            yPosition += 6;
          }

          // Description with bullet
          if (exp.description) {
            pdf.setFont("helvetica", "normal");
            pdf.text("•", leftMargin, yPosition);
            yPosition = wrapText(
              exp.description,
              leftMargin + 5,
              yPosition,
              maxLineWidth - 5,
              6
            );
          }

          yPosition += 6;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
  }
  // Add Sport section if athlete data exists\
  pdf.addPage();
  yPosition = 20;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("User Skill", leftMargin, yPosition);
  yPosition += 10;
  if (
    userData?.is_athlete &&
    userData?.athlete &&
    userData?.athlete?.primary_sport
  ) {
    yPosition = addSectionTitle(
      `Sport: ${
        userData?.athlete?.primary_sport?.sport_name || "Not specified"
      }`,
      yPosition
    );

    // Add Position section if athlete data exists
    if (userData.athlete && userData.athlete.sport_position) {
      yPosition = addSectionTitle(
        `Position: ${
          userData.athlete.sport_position.position_name || "Not specified"
        }`,
        yPosition
      );

      // Extract topics from the position data
      const positionTopics = userData.athlete.sport_position.topics || [];
      if (Array.isArray(positionTopics) && positionTopics.length > 0) {
        positionTopics.forEach((topic, index) => {
          if (topic) {
            yPosition = addListItem(
              index + 1,
              topic.title || "Untitled",
              yPosition,
              [{ description: topic.description || "No description available" }]
            );
            yPosition += 3;
            yPosition = checkPageBreak(yPosition);
          }
        });
      }
      yPosition += 5;
    }
  }

  // Add Military section if data exists
  if (
    userData.has_military_service &&
    userData.military &&
    userData.military.branch_of_service
  ) {
    yPosition = addSectionTitle(
      `Military: ${
        userData.military.branch_of_service.service_name || "Not specified"
      }`,
      yPosition
    );

    // Add Rank section if data exists
    if (userData.military && userData.military.rank) {
      yPosition = addSectionTitle(
        `Position: ${userData.military.rank.rank_name || "Not specified"}`,
        yPosition
      );

      // Extract topics from the rank data
      const rankTopics = userData.military.rank.topics || [];
      if (Array.isArray(rankTopics) && rankTopics.length > 0) {
        rankTopics.forEach((topic, index) => {
          if (topic) {
            yPosition = addListItem(
              index + 1,
              topic.title || "Untitled",
              yPosition,
              [{ description: topic.description || "No description available" }]
            );
            yPosition += 3;
            yPosition = checkPageBreak(yPosition);
          }
        });
      }
      yPosition += 5;
    }
  }

  // Add Favorite Subject section
  if (userData.favorite_middle_school_subject) {
    const subjectName =
      userData.favorite_middle_school_subject.subject_name || "Unnamed Subject";
    yPosition = addSectionTitle(`Favorite Subject: ${subjectName}`, yPosition);

    // Extract topics from the subject data
    const subjectTopics = userData.favorite_middle_school_subject.topics || [];
    if (Array.isArray(subjectTopics) && subjectTopics.length > 0) {
      subjectTopics.forEach((topic, index) => {
        if (topic) {
          yPosition = addListItem(
            index + 1,
            topic.title || "Untitled",
            yPosition,
            [{ description: topic.description || "No description available" }]
          );
          yPosition += 3;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
    yPosition += 5;
  }

  // Add Hobby 1 section
  if (userData.favorite_hobby1) {
    const hobbyName = userData.favorite_hobby1.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby1.topics || [];
    if (Array.isArray(hobbyTopics) && hobbyTopics.length > 0) {
      hobbyTopics.forEach((topic, index) => {
        if (topic) {
          yPosition = addListItem(
            index + 1,
            topic.title || "Untitled",
            yPosition,
            [{ description: topic.description || "No description available" }]
          );
          yPosition += 3;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
    yPosition += 5;
  }

  // Add Hobby 2 section
  if (userData.favorite_hobby2) {
    const hobbyName = userData.favorite_hobby2.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby 2: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby2.topics || [];
    if (Array.isArray(hobbyTopics) && hobbyTopics.length > 0) {
      hobbyTopics.forEach((topic, index) => {
        if (topic) {
          yPosition = addListItem(
            index + 1,
            topic.title || "Untitled",
            yPosition,
            [{ description: topic.description || "No description available" }]
          );
          yPosition += 3;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
    yPosition += 5;
  }

  // Add a page break between sections

  // Add End of document marker on the last page
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text("End of document", pdfWidth - rightMargin, 280, null, null, "right");

  return pdf;
}

export function downloadSendReportPDF(userData, resume, idpData) {
  console.log("userData--> ", userData);
  console.log("resume--> ", resume);
  console.log("idpData--> ", idpData);

  // Define PDF dimensions
  const pdfWidth = 210; // A4 width in mm
  const pdfHeight = 297; // A4 height in mm
  const leftMargin = 20;
  const rightMargin = 20;
  const maxLineWidth = pdfWidth - leftMargin - rightMargin;

  // Create new PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [pdfWidth, pdfHeight],
  });

  // Set initial position for content
  let yPosition = 20;

  // Helper function to wrap text and return new Y position
  const wrapText = (text, x, y, maxWidth, lineHeight) => {
    if (!text) return y;

    // Split the text into words
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth =
        (pdf.getStringUnitWidth(testLine) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;

      if (testWidth > maxWidth && i > 0) {
        pdf.text(line.trim(), x, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }

    // Print the last line
    if (line.trim() !== "") {
      pdf.text(line.trim(), x, currentY);
      currentY += lineHeight;
    }

    return currentY;
  };

  // Helper function to add section title with underline
  const addSectionTitle = (title, y) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(title.toUpperCase() || "UNTITLED SECTION", leftMargin, y);

    // Add horizontal line below the title
    y += 2;
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.line(leftMargin, y, pdfWidth - rightMargin, y);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    return y + 6;
  };

  // Helper function to add a numbered list item with subitems
  const addListItem = (number, text, y, subitems = []) => {
    pdf.text(`${number}. ${text || "No title"}`, leftMargin, y);
    let currentY = y + 6;

    if (Array.isArray(subitems)) {
      subitems.forEach((item, index) => {
        if (item) {
          const letter = String.fromCharCode(97 + index); // a, b, c, ...
          const description =
            item.description ||
            (typeof item === "string" ? item : "No description available");

          // Initial position for the prefix (a., b., etc)
          pdf.text(`    ${letter}.`, leftMargin, currentY);

          // Calculate indent for the wrapped text (prefix width)
          const prefixWidth =
            (pdf.getStringUnitWidth(`    ${letter}. `) *
              pdf.internal.getFontSize()) /
            pdf.internal.scaleFactor;
          const indentedX = leftMargin + prefixWidth;
          const indentedMaxWidth = maxLineWidth - prefixWidth;

          // Position for the start of the description text
          const descStartY = currentY;

          // Wrap and draw the description text with proper indentation
          currentY = wrapText(
            description,
            indentedX,
            descStartY,
            indentedMaxWidth,
            6
          );
        }
      });
    }

    return currentY;
  };

  // Check if we need a new page
  const checkPageBreak = (currentY) => {
    if (currentY > 270) {
      pdf.addPage();
      return 20; // Reset Y position to top of page with margin
    }
    return currentY;
  };

  // Add PDF title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("User Profile & Resume", leftMargin, yPosition);
  yPosition += 10;

  // PART 1: Add User Profile Data
  yPosition = addSectionTitle("USER PROFILE", yPosition);
  yPosition += 5;

  // Add Sport section if athlete data exists
  if (
    userData?.is_athlete &&
    userData?.athlete &&
    userData?.athlete?.primary_sport
  ) {
    yPosition = addSectionTitle(
      `Sport: ${
        userData?.athlete?.primary_sport?.sport_name || "Not specified"
      }`,
      yPosition
    );

    // Add Position section if athlete data exists
    if (userData.athlete && userData.athlete.sport_position) {
      yPosition = addSectionTitle(
        `Position: ${
          userData.athlete.sport_position.position_name || "Not specified"
        }`,
        yPosition
      );

      // Extract topics from the position data
      const positionTopics = userData.athlete.sport_position.topics || [];
      if (Array.isArray(positionTopics) && positionTopics.length > 0) {
        positionTopics.forEach((topic, index) => {
          if (topic) {
            yPosition = addListItem(
              index + 1,
              topic.title || "Untitled",
              yPosition,
              [{ description: topic.description || "No description available" }]
            );
            yPosition += 3;
            yPosition = checkPageBreak(yPosition);
          }
        });
      }
      yPosition += 5;
    }
  }

  // Add Military section if data exists
  if (
    userData.has_military_service &&
    userData.military &&
    userData.military.branch_of_service
  ) {
    yPosition = addSectionTitle(
      `Military: ${
        userData.military.branch_of_service.service_name || "Not specified"
      }`,
      yPosition
    );

    // Add Rank section if data exists
    if (userData.military && userData.military.rank) {
      yPosition = addSectionTitle(
        `Position: ${userData.military.rank.rank_name || "Not specified"}`,
        yPosition
      );

      // Extract topics from the rank data
      const rankTopics = userData.military.rank.topics || [];
      if (Array.isArray(rankTopics) && rankTopics.length > 0) {
        rankTopics.forEach((topic, index) => {
          if (topic) {
            yPosition = addListItem(
              index + 1,
              topic.title || "Untitled",
              yPosition,
              [{ description: topic.description || "No description available" }]
            );
            yPosition += 3;
            yPosition = checkPageBreak(yPosition);
          }
        });
      }
      yPosition += 5;
    }
  }

  // Add Favorite Subject section
  if (userData.favorite_middle_school_subject) {
    const subjectName =
      userData.favorite_middle_school_subject.subject_name || "Unnamed Subject";
    yPosition = addSectionTitle(`Favorite Subject: ${subjectName}`, yPosition);

    // Extract topics from the subject data
    const subjectTopics = userData.favorite_middle_school_subject.topics || [];
    if (Array.isArray(subjectTopics) && subjectTopics.length > 0) {
      subjectTopics.forEach((topic, index) => {
        if (topic) {
          yPosition = addListItem(
            index + 1,
            topic.title || "Untitled",
            yPosition,
            [{ description: topic.description || "No description available" }]
          );
          yPosition += 3;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
    yPosition += 5;
  }

  // Add Hobby 1 section
  if (userData.favorite_hobby1) {
    const hobbyName = userData.favorite_hobby1.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby1.topics || [];
    if (Array.isArray(hobbyTopics) && hobbyTopics.length > 0) {
      hobbyTopics.forEach((topic, index) => {
        if (topic) {
          yPosition = addListItem(
            index + 1,
            topic.title || "Untitled",
            yPosition,
            [{ description: topic.description || "No description available" }]
          );
          yPosition += 3;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
    yPosition += 5;
  }

  // Add Hobby 2 section
  if (userData.favorite_hobby2) {
    const hobbyName = userData.favorite_hobby2.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby 2: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby2.topics || [];
    if (Array.isArray(hobbyTopics) && hobbyTopics.length > 0) {
      hobbyTopics.forEach((topic, index) => {
        if (topic) {
          yPosition = addListItem(
            index + 1,
            topic.title || "Untitled",
            yPosition,
            [{ description: topic.description || "No description available" }]
          );
          yPosition += 3;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }
    yPosition += 5;
  }

  // Add a page break between sections
  pdf.addPage();
  yPosition = 20;

  // PART 2: Add Resume data
  // Get the first resume from the array if resume is an array
  const resumeData = Array.isArray(resume) ? resume[0] : resume;

  if (resumeData) {
    // Personal Information - Large centered name
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    const nameText = resumeData.full_name || "Name Not Provided";
    // Center the name
    const nameWidth =
      (pdf.getStringUnitWidth(nameText) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const nameX = (pdfWidth - nameWidth) / 2;
    pdf.text(nameText, nameX, yPosition);
    yPosition += 10;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    // Contact information - centered
    let contactInfo = [];
    if (resumeData.email) contactInfo.push(resumeData.email);
    if (resumeData.phone) contactInfo.push(`+1 ${resumeData.phone}`);
    if (resumeData.address) contactInfo.push(resumeData.address);

    if (contactInfo.length > 0) {
      const contactText = contactInfo.join("  ");
      const contactWidth =
        (pdf.getStringUnitWidth(contactText) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const contactX = (pdfWidth - contactWidth) / 2;
      pdf.text(contactText, contactX, yPosition);
      yPosition += 12;
    }

    // Professional Objective
    if (resumeData.objective && resumeData.objective.description) {
      yPosition = addSectionTitle("Objective", yPosition);
      yPosition += 4;
      yPosition = wrapText(
        resumeData.objective.description,
        leftMargin,
        yPosition,
        maxLineWidth,
        6
      );
      yPosition += 10;
      yPosition = checkPageBreak(yPosition);
    }

    // Work Experience
    if (
      resumeData.experience &&
      Array.isArray(resumeData.experience) &&
      resumeData.experience.length > 0
    ) {
      yPosition = addSectionTitle("Work Experience", yPosition);
      yPosition += 4;

      resumeData.experience.forEach((job) => {
        if (job) {
          // Company name on left, date on right
          pdf.setFont("helvetica", "bold");
          pdf.text(
            job.company || "Company Not Provided",
            leftMargin,
            yPosition
          );

          // Format and right-align dates
          if (job.start_date || job.end_date) {
            const startYear = job.start_date
              ? new Date(job.start_date).getFullYear()
              : "";
            const endDate = job.end_date
              ? new Date(job.end_date).getFullYear()
              : "Present";
            const dateRange = `${startYear} - ${endDate}`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;

          // Job title
          pdf.setFont("helvetica", "bold");
          pdf.text(
            job.job_title || "Position Not Provided",
            leftMargin,
            yPosition
          );
          yPosition += 6;

          // Job description with indentation
          if (job.description) {
            pdf.setFont("helvetica", "normal");
            const descLines = job.description.split(/\r?\n/);

            // Add description with proper indentation
            descLines.forEach((line) => {
              if (line.trim()) {
                // Skip empty lines
                yPosition = wrapText(
                  line,
                  leftMargin + 8,
                  yPosition,
                  maxLineWidth - 8,
                  6
                );
              }
            });
          }

          yPosition += 8;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Education
    if (
      resumeData.education &&
      Array.isArray(resumeData.education) &&
      resumeData.education.length > 0
    ) {
      yPosition = addSectionTitle("Education", yPosition);
      yPosition += 4;

      resumeData.education.forEach((edu) => {
        if (edu) {
          // Left side: Institution name
          pdf.setFont("helvetica", "bold");
          pdf.text(
            edu.institution || "Institution Not Provided",
            leftMargin,
            yPosition
          );

          // Right side: Date range
          if (edu.start_year || edu.end_year) {
            const dateRange = `${edu.start_year || ""} - ${
              edu.end_year || "Present"
            }`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;

          // Degree with bullet
          if (edu.degree) {
            pdf.setFont("helvetica", "normal");
            pdf.text("•", leftMargin + 3, yPosition);
            yPosition = wrapText(
              edu.degree,
              leftMargin + 8,
              yPosition,
              maxLineWidth - 8,
              6
            );
          }

          // Field of study with bullet if provided
          if (edu.field_of_study) {
            pdf.text("•", leftMargin + 3, yPosition);
            yPosition = wrapText(
              edu.field_of_study,
              leftMargin + 8,
              yPosition,
              maxLineWidth - 8,
              6
            );
          }

          yPosition += 8;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Combined Skills section
    if (
      (resumeData.soft_skills && resumeData.soft_skills.length > 0) ||
      (resumeData.technical_skills && resumeData.technical_skills.length > 0)
    ) {
      yPosition = addSectionTitle("Skills", yPosition);
      yPosition += 4;

      // Soft Skills
      if (
        resumeData.soft_skills &&
        Array.isArray(resumeData.soft_skills) &&
        resumeData.soft_skills.length > 0
      ) {
        pdf.setFont("helvetica", "bold");
        pdf.text("Soft Skills", leftMargin, yPosition);
        yPosition += 6;

        pdf.setFont("helvetica", "normal");
        resumeData.soft_skills.forEach((skill, index) => {
          if (skill) {
            const bulletX = leftMargin + 3;
            const textX = leftMargin + 8;

            pdf.text("•", bulletX, yPosition);
            pdf.text(skill, textX, yPosition);
            yPosition += 5;
          }
        });
        yPosition += 3;
      }

      // Technical Skills
      if (
        resumeData.technical_skills &&
        Array.isArray(resumeData.technical_skills) &&
        resumeData.technical_skills.length > 0
      ) {
        pdf.setFont("helvetica", "bold");
        pdf.text("Technical Skills", leftMargin, yPosition);
        yPosition += 6;

        pdf.setFont("helvetica", "normal");
        resumeData.technical_skills.forEach((skill, index) => {
          if (skill) {
            const bulletX = leftMargin + 3;
            const textX = leftMargin + 8;

            pdf.text("•", bulletX, yPosition);
            pdf.text(skill, textX, yPosition);
            yPosition += 5;
          }
        });
      }

      yPosition += 5;
      yPosition = checkPageBreak(yPosition);
    }

    // Certifications
    if (
      resumeData.licenses_and_certifications &&
      Array.isArray(resumeData.licenses_and_certifications) &&
      resumeData.licenses_and_certifications.length > 0
    ) {
      yPosition = addSectionTitle("Certifications", yPosition);
      yPosition += 4;

      resumeData.licenses_and_certifications.forEach((cert) => {
        if (cert) {
          // Bullet point
          pdf.setFont("helvetica", "normal");
          pdf.text("•", leftMargin, yPosition);

          // Certification name
          pdf.setFont("helvetica", "bold");
          pdf.text(
            cert.certification_name || "Certification Not Provided",
            leftMargin + 5,
            yPosition
          );

          // Format and right-align dates
          if (cert.issue_date || cert.expiration_date) {
            const issueYear = cert.issue_date
              ? new Date(cert.issue_date).getFullYear()
              : "";
            const expirationYear = cert.expiration_date
              ? new Date(cert.expiration_date).getFullYear()
              : "";
            const dateRange = `${issueYear} - ${expirationYear}`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;
          yPosition = checkPageBreak(yPosition);
        }
      });

      yPosition += 4;
    }

    // Honors and Awards
    if (
      resumeData.honors_and_awards &&
      Array.isArray(resumeData.honors_and_awards) &&
      resumeData.honors_and_awards.length > 0
    ) {
      yPosition = addSectionTitle("Honors", yPosition);
      yPosition += 4;

      resumeData.honors_and_awards.forEach((award) => {
        if (award) {
          // Bullet point
          pdf.setFont("helvetica", "normal");
          pdf.text("•", leftMargin, yPosition);

          // Award name
          pdf.setFont("helvetica", "bold");
          pdf.text(
            award.award_name || "Award Not Provided",
            leftMargin + 5,
            yPosition
          );

          // Format and right-align date
          if (award.date_Received) {
            const year = new Date(award.date_Received).getFullYear();
            const dateWidth =
              (pdf.getStringUnitWidth(year.toString()) *
                pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(
              year.toString(),
              pdfWidth - rightMargin - dateWidth,
              yPosition
            );
          }

          yPosition += 6;

          // Organization if provided (indented)
          if (award.awarding_organization) {
            pdf.setFont("helvetica", "normal");
            pdf.text(award.awarding_organization, leftMargin + 5, yPosition);
            yPosition += 6;
          }

          if (award.description && award.description.trim()) {
            yPosition = wrapText(
              award.description,
              leftMargin + 5,
              yPosition,
              maxLineWidth - 5,
              6
            );
            yPosition += 2;
          }

          yPosition += 4;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Volunteer Experience
    if (
      resumeData.volunteer_experience &&
      Array.isArray(resumeData.volunteer_experience) &&
      resumeData.volunteer_experience.length > 0
    ) {
      yPosition = addSectionTitle("Volunteer Service", yPosition);
      yPosition += 4;

      resumeData.volunteer_experience.forEach((exp) => {
        if (exp) {
          // Organization name on left, date on right
          pdf.setFont("helvetica", "bold");
          pdf.text(
            exp.organization_name || "Organization Not Provided",
            leftMargin,
            yPosition
          );

          // Format and right-align dates
          if (exp.start_year || exp.end_year) {
            const dateRange = `${exp.start_year || ""} - ${
              exp.end_year || "Present"
            }`;
            const dateWidth =
              (pdf.getStringUnitWidth(dateRange) * pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor;
            pdf.setFont("helvetica", "normal");
            pdf.text(dateRange, pdfWidth - rightMargin - dateWidth, yPosition);
          }

          yPosition += 6;

          // Role or position if provided
          if (exp.role) {
            pdf.setFont("helvetica", "bold");
            pdf.text(exp.role, leftMargin, yPosition);
            yPosition += 6;
          }

          // Description with bullet
          if (exp.description) {
            pdf.setFont("helvetica", "normal");
            pdf.text("•", leftMargin, yPosition);
            yPosition = wrapText(
              exp.description,
              leftMargin + 5,
              yPosition,
              maxLineWidth - 5,
              6
            );
          }

          yPosition += 6;
          yPosition = checkPageBreak(yPosition);
        }
      });
    }

    // Support People (if exists)
  }

  // Add IDP title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(" Plan (IDP)", leftMargin, yPosition);
  yPosition += 10;

  // Check if idpData exists and has data array
  if (
    idpData &&
    idpData.data &&
    Array.isArray(idpData.data) &&
    idpData.data.length > 0
  ) {
    // Process each question-answer pair
    idpData.data.forEach((item, index) => {
      if (item && item.question) {
        yPosition = checkPageBreak(yPosition);

        // Add placeholder image before each question (40x40mm square)
        const imageSize = 20;
        const currentImage = awardImages[index] || Rookieaward; // fallback

        // Draw the image
        pdf.addImage(
          currentImage,
          "PNG", // or 'JPEG' depending on the format
          leftMargin,
          yPosition,
          imageSize,
          imageSize
        );
        // Add image border
        // pdf.setDrawColor(100, 100, 100); // Darker gray for border
        // pdf.setLineWidth(0.5);
        // pdf.rect(leftMargin, yPosition, imageSize, imageSize, 'S');

        // // Add image icon (simple drawing in the center of placeholder)
        // pdf.setDrawColor(80, 80, 80);
        // pdf.setLineWidth(0.8);

        // // Draw a simple icon inside the placeholder (e.g., document icon)
        // const iconMargin = 5;
        // pdf.line(
        //   leftMargin + iconMargin,
        //   yPosition + iconMargin,
        //   leftMargin + imageSize - iconMargin,
        //   yPosition + iconMargin
        // );
        // pdf.line(
        //   leftMargin + iconMargin,
        //   yPosition + imageSize/2,
        //   leftMargin + imageSize - iconMargin,
        //   yPosition + imageSize/2
        // );
        // pdf.line(
        //   leftMargin + iconMargin,
        //   yPosition + imageSize - iconMargin,
        //   leftMargin + imageSize - iconMargin,
        //   yPosition + imageSize - iconMargin
        // );

        // Position text to the right of the image
        const textX = leftMargin + imageSize + 5;
        const questionWidth = maxLineWidth - imageSize - 5;

        // Question number
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text(`Question ${index + 1}:`, textX, yPosition + 6);

        // Question text
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        yPosition = wrapText(
          item.question.question || "No question available",
          textX,
          yPosition + 12,
          questionWidth,
          6
        );

        yPosition += 6;

        // Answer section
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text("Answer:", textX, yPosition);
        yPosition += 6;

        // Format the answer based on its type
        pdf.setFont("helvetica", "normal");

        if (item.answer === null || item.answer === undefined) {
          pdf.text("No answer provided.", textX, yPosition);
          yPosition += 6;
        } else if (Array.isArray(item.answer)) {
          // Handle array of answers (bullets)
          item.answer.forEach((ans, i) => {
            if (ans) {
              pdf.text("•", textX, yPosition);
              yPosition = wrapText(
                ans,
                textX + 5,
                yPosition,
                questionWidth - 5,
                6
              );
              yPosition += 2;
            }
          });
        } else {
          // Handle single answer
          yPosition = wrapText(
            item.answer.toString(),
            textX,
            yPosition,
            questionWidth,
            6
          );
        }

        yPosition += 15; // Extra space between questions
      }
    });
  } else {
    // No IDP data available
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("No data available.", leftMargin, yPosition);
    yPosition += 10;
  }

  // Add End of document marker on the last page
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text("End of document", pdfWidth - rightMargin, 280, null, null, "right");

  const pdfBlob = pdf.output("blob");
  return pdfBlob;
}

// Example usage:
// const pdf = createPDFWithUserDataAndResume(userData, resume);
// pdf.save("user_profile_and_resume.pdf");

// Example usage:
// const pdf = createPDFWithSkillsAndResume(getSkill, resume);
// pdf.save("skills_and_resume.pdf");
