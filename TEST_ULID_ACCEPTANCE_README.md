# ULID Production Acceptance Test

This script runs acceptance tests against the deployed Azure instance to verify that ULID generation is working correctly in the production environment.

## Prerequisites

- Python 3.7 or higher
- Required Python packages: `requests`

## Installation

1. Install the required packages:
```bash
pip install requests
```

## Usage

Run the acceptance test script:

```bash
python test_ulid_acceptance.py
```

## What the Test Does

The script performs the following checks:

1. **API Health Check**: Verifies the API endpoint is accessible
2. **ULID Format Validation**: Checks that entity IDs are proper 26-character ULID strings with valid base32 characters
3. **ULID Uniqueness**: Ensures all generated ULIDs are unique
4. **Chronological Ordering**: Verifies that ULIDs maintain chronological order when sorted lexicographically
5. **Timestamp Extraction**: Confirms that the timestamp component can be correctly extracted

## Expected Results

- All entity IDs should be valid 26-character ULID strings
- All ULIDs should be unique
- When multiple ULIDs are created in sequence, they should maintain chronological order when sorted
- The API should be accessible and responsive

## How to Run in Different Environments

### Local Development
```bash
python test_ulid_acceptance.py
```

### CI/CD Pipeline
The script can be integrated into your CI/CD pipeline to automatically test the deployed application after deployments.

### Manual Verification
Run the script whenever you need to verify that ULID generation is working correctly in the deployed environment.