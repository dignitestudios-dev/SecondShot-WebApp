import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Generates a PDF from user profile data that includes hobbies, subjects, and sports
 * @param {Object} userData - The user data object from the API
 * @returns {jsPDF} - The generated PDF document
 */
export const generateProfilePDF = (userData) => {
  // Null check for userData
  if (!userData) {
    console.error("User data is undefined or null");
    return new jsPDF(); // Return empty PDF
  }

  // Create a new PDF document
  const doc = new jsPDF();

  // Set page margins (in mm)
  const pageWidth = 210; // A4 width
  const leftMargin = 20;
  const rightMargin = 20;
  const maxLineWidth = pageWidth - leftMargin - rightMargin;

  // Set font size and style
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

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
        (doc.getStringUnitWidth(testLine) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;

      if (testWidth > maxWidth && i > 0) {
        doc.text(line.trim(), x, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }

    // Print the last line
    if (line.trim() !== "") {
      doc.text(line.trim(), x, currentY);
      currentY += lineHeight;
    }

    return currentY;
  };

  // Helper function to add section title
  const addSectionTitle = (title, y) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title || "Untitled Section", leftMargin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    return y + 8;
  };

  // Helper function to add a numbered list item with subitems
  const addListItem = (number, text, y, subitems = []) => {
    doc.text(`${number}. ${text || "No title"}`, leftMargin, y);
    let currentY = y + 6;

    if (Array.isArray(subitems)) {
      subitems.forEach((item, index) => {
        if (item) {
          const letter = String.fromCharCode(97 + index); // a, b, c, ...
          const description =
            item.description ||
            (typeof item === "string" ? item : "No description available");

          // Initial position for the prefix (a., b., etc)
          doc.text(`    ${letter}.`, leftMargin, currentY);

          // Calculate indent for the wrapped text (prefix width)
          const prefixWidth =
            (doc.getStringUnitWidth(`    ${letter}. `) *
              doc.internal.getFontSize()) /
            doc.internal.scaleFactor;
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

  let yPosition = 20;

  // Add Sport section if athlete data exists
  if (
    userData?.is_athlete &&
    userData?.athlete &&
    userData?.athlete?.primary_sport
  ) {
    yPosition = addSectionTitle(
      `Sport: ${userData?.athlete?.primary_sport?.sport_name}`,
      yPosition
    );

    // This is a placeholder - you would normally get topics from userData.athlete
    // For demonstration purposes, adding a generic safety point
    // Extract topics from the hobby data

    // Add Position section if athlete data exists
    if (
      userData.is_athlete &&
      userData.athlete &&
      userData.athlete.sport_position
    ) {
      yPosition = addSectionTitle(
        `Position: ${userData.athlete.sport_position.position_name}`,
        yPosition
      );

      // Extract topics from the hobby data
      const hobbyTopics = userData.athlete.sport_position.topics || [];
      if (Array.isArray(hobbyTopics)) {
        hobbyTopics.forEach((topic, index) => {
          if (topic && index <= hobbyTopics.length - 1) {
            // Limit to first 2 topics to match format in image
            const prevPosition = yPosition;
            yPosition = addListItem(index + 1, topic.title, yPosition, [
              { description: topic.description || "No description available" },
            ]);

            // Check if we need a new page after adding this item
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          }
        });
      }

      yPosition += 10;
    }
  }

  // Add Position section if athlete data exists
  if (
    userData.is_athlete &&
    userData.military &&
    userData.military.branch_of_service
  ) {
    yPosition = addSectionTitle(
      `Military: ${userData.military.branch_of_service.service_name}`,
      yPosition
    );

    // Add Position section if athlete data exists
    if (userData.is_athlete && userData.military && userData.military.rank) {
      yPosition = addSectionTitle(
        `Position: ${userData.military.rank.rank_name}`,
        yPosition
      );

      // Extract topics from the hobby data
      const hobbyTopics = userData.military.rank.topics || [];
      if (Array.isArray(hobbyTopics)) {
        hobbyTopics.forEach((topic, index) => {
          if (topic && index <= hobbyTopics.length - 1) {
            // Limit to first 2 topics to match format in image
            const prevPosition = yPosition;
            yPosition = addListItem(index + 1, topic.title, yPosition, [
              { description: topic.description || "No description available" },
            ]);

            // Check if we need a new page after adding this item
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
          }
        });
      }

      yPosition += 10;
    }
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Favorite Subject section
  if (userData.favorite_middle_school_subject) {
    const subjectName =
      userData.favorite_middle_school_subject.subject_name || "Unnamed Subject";
    yPosition = addSectionTitle(`Favorite Subject: ${subjectName}`, yPosition);

    // Extract topics from the subject data
    const subjectTopics = userData.favorite_middle_school_subject.topics || [];
    if (Array.isArray(subjectTopics)) {
      subjectTopics.forEach((topic, index) => {
        if (topic) {
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }

    yPosition += 10;
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Hobby 1 section
  if (userData.favorite_hobby1) {
    const hobbyName = userData.favorite_hobby1.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby1.topics || [];
    if (Array.isArray(hobbyTopics)) {
      hobbyTopics.forEach((topic, index) => {
        if (topic && index <= hobbyTopics.length - 1) {
          // Limit to first 2 topics to match format in image
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }

    yPosition += 10;
  }

  // Check if we need to start a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Add Hobby 2 section
  if (userData.favorite_hobby2) {
    const hobbyName = userData.favorite_hobby2.hobbie_name || "Unnamed Hobby";
    yPosition = addSectionTitle(`Favorite Hobby 2: ${hobbyName}`, yPosition);

    // Extract topics from the hobby data
    const hobbyTopics = userData.favorite_hobby2.topics || [];
    if (Array.isArray(hobbyTopics)) {
      hobbyTopics.forEach((topic, index) => {
        if (topic && index <= hobbyTopics.length - 1) {
          // Limit to first 2 topics to match format in image
          const prevPosition = yPosition;
          yPosition = addListItem(index + 1, topic.title, yPosition, [
            { description: topic.description || "No description available" },
          ]);

          // Check if we need a new page after adding this item
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }
  }

  // Add End of document marker on the last page
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "End of document",
    pageWidth - rightMargin,
    280,
    null,
    null,
    "right"
  );

  return doc;
};

/**
 * Function to download the user profile data as a PDF
 * @param {Object} userData - The user data object from the API
 */
export const downloadProfilePDF = (userData) => {
  try {
    if (!userData) {
      console.error("Cannot generate PDF: User data is missing");
      return;
    }
    const doc = generateProfilePDF(userData);
    doc.save("profile-report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
