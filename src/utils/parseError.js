const errorMap = [
    { match: /network/i,                                    message: "Network error. Please check your connection and try again." },
    { match: /invalid credentials/i,                        message: "Incorrect email or password." },
    { match: /user.*already exists/i,                       message: "An account with this email already exists." },
    { match: /password.*least/i,                            message: "Password must be at least 8 characters long." },
    { match: /rate limit/i,                                 message: "Too many attempts. Please wait a moment and try again." },
    { match: /document.*not found/i,                        message: "This post could not be found." },
    { match: /unauthorized/i,                               message: "You don't have permission to do that." },
    { match: /attribute.*invalid type|no longer than/i,     message: null }, // handled dynamically below
    { match: /missing required attribute/i,                 message: "Please fill in all required fields." },
    { match: /file.*size/i,                                 message: "The image is too large. Please choose a smaller file." },
    { match: /storage.*quota/i,                             message: "Storage limit reached. Please contact support." },
];

export function parseError(error) {
    const raw = error?.message || String(error);

    // Extract field name from Appwrite's "Attribute "fieldName" has invalid type" messages
    if (/attribute.*invalid type|no longer than/i.test(raw)) {
        const fieldMatch = raw.match(/[Aa]ttribute\s+"([^"]+)"/);
        const field = fieldMatch ? fieldMatch[1] : null;
        return field
            ? `The "${field}" field has invalid or too-long content. Please review it.`
            : "One of the fields has invalid or too-long content. Please review your post.";
    }

    const match = errorMap.find(({ match }) => match.test(raw));
    return match ? match.message : "Something went wrong. Please try again.";
}
