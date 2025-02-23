import fs from 'fs/promises'; // Use fs/promises for modern async file system handling
import path from 'path';
import { fileURLToPath } from 'url';

// Hardcode your input and output file names here
const inputFileName = 'Wednesdayaug21.vtt'; // Change this to the input VTT file name
const outputFileName = 'Wednesdayaug21.json'; // Change this to the desired output JSON file name

// Get the current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses the time string into total seconds.
 * @param {string} timeStr - The time string (e.g., "00:01:03.210").
 * @returns {number} - Total time in seconds.
 */
function parseTime(timeStr) {
    const parts = timeStr.split(':').map(part => part.trim());
    let totalSeconds = 0;

    if (parts.length === 3) {
        // Format: HH:MM:SS.mmm
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const secondsParts = parts[2].split('.');
        const seconds = parseInt(secondsParts[0], 10);
        const milliseconds = parseInt(secondsParts[1] || '0', 10);
        totalSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    } else if (parts.length === 2) {
        // Format: MM:SS.mmm
        const minutes = parseInt(parts[0], 10);
        const secondsParts = parts[1].split('.');
        const seconds = parseInt(secondsParts[0], 10);
        const milliseconds = parseInt(secondsParts[1] || '0', 10);
        totalSeconds = minutes * 60 + seconds + milliseconds / 1000;
    } else {
        // Unsupported format
        totalSeconds = 0;
    }

    return totalSeconds;
}

/**
 * Removes duplicate segments based on time and text.
 * @param {Array} segments - Array of segment objects.
 * @returns {Array} - Array of unique segment objects.
 */
function removeDuplicates(segments) {
    const seen = new Set();
    const uniqueSegments = [];

    segments.forEach(segment => {
        const identifier = `${segment.time}||${segment.text}`;
        if (!seen.has(identifier)) {
            seen.add(identifier);
            uniqueSegments.push(segment);
        }
    });

    return uniqueSegments;
}

/**
 * Parses the input VTT file and extracts videos with segments.
 * @param {string} filePath - Path to the input VTT file.
 * @returns {Array} - Array of video objects.
 */
async function parseVTTFile(filePath) {
    const videos = [];
    let currentVideo = null;
    let currentSegments = [];

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const lines = fileContent.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
        let line = lines[i].trim();

        if (line.startsWith("Title:")) {
            // If there's an existing video, finalize it
            if (currentVideo) {
                currentVideo.segments = removeDuplicates(
                    currentSegments.sort((a, b) => parseTime(a.time) - parseTime(b.time))
                );
                videos.push(currentVideo);
            }

            // Start a new video
            const title = line.replace("Title:", "").trim();
            currentVideo = { title: title, url: "", segments: [] };
            currentSegments = [];
            i++;
            continue;
        }
        else if (line.startsWith("URL:")) {
            if (currentVideo) {
                const url = line.replace("URL:", "").trim();
                currentVideo.url = url;
            }
            i++;
            continue;
        }
        else if (/^\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}$/.test(line) ||
                 /^\d{1,2}:\d{2}:\d{2}\.\d{3} --> \d{1,2}:\d{2}:\d{2}\.\d{3}$/.test(line)) {
            const [start, end] = line.split(' --> ').map(part => part.trim());
            i++;
            if (i < lines.length) {
                let text = lines[i].trim();
                // Remove any speaker tags like <v Speaker 0>
                text = text.replace(/<v\s+[^>]+>/i, '').trim();
                currentSegments.push({ time: start, text: text });
            }
            i++;
            continue;
        }
        else {
            // Skip lines that do not match any criteria
            i++;
        }
    }

    // After processing all lines, finalize the last video
    if (currentVideo) {
        currentVideo.segments = removeDuplicates(
            currentSegments.sort((a, b) => parseTime(a.time) - parseTime(b.time))
        );
        videos.push(currentVideo);
    }

    return videos;
}

/**
 * Saves the data to a JSON file.
 * @param {Array} data - Data to be saved.
 * @param {string} outputFile - Path to the output JSON file.
 */
async function saveToJson(data, outputFile) {
    await fs.writeFile(outputFile, JSON.stringify(data, null, 4), 'utf-8');
    console.log(`Data successfully saved to ${outputFile}`);
}

/**
 * Main function to execute the script.
 */
async function main() {
    const inputFilePath = path.resolve(__dirname, inputFileName); // Hardcoded input file
    const outputFilePath = path.resolve(__dirname, outputFileName); // Hardcoded output file

    try {
        // Check if input file exists
        await fs.access(inputFilePath);
    } catch (error) {
        console.error(`Error: Input file does not exist at path '${inputFilePath}'.`);
        process.exit(1);
    }

    try {
        const parsedData = await parseVTTFile(inputFilePath);
        await saveToJson(parsedData, outputFilePath);
    } catch (error) {
        console.error('Error processing the file:', error.message);
        process.exit(1);
    }
}

// Execute the main function
main();
