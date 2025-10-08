#!/usr/bin/env python3
"""
Flyway Repair Script
This script helps repair Flyway migration checksum mismatches in the P4 B2B Marketplace
"""
import subprocess
import sys
import os
from pathlib import Path


def repair_flyway_migrations():
    """Repair the Flyway migration checksum mismatches"""
    print("Attempting to repair Flyway migration checksum mismatches...")
    
    # Check if we're in the backend directory or project root
    if Path("backend").exists() and Path("backend").is_dir():
        backend_path = Path("backend")
    else:
        backend_path = Path(".")
    
    # Try to repair using Maven (if in backend directory)
    try:
        print("Attempting Flyway repair using Maven...")
        
        # First check if mvnw exists
        mvnw_path = backend_path / "mvnw"
        if not mvnw_path.exists():
            mvnw_path = backend_path / "mvnw.cmd"
        
        if mvnw_path.exists():
            # Run flyway repair command
            cmd = [str(mvnw_path), "flyway:repair", "-Dspring.profiles.active=prod"]
            result = subprocess.run(cmd, cwd=backend_path, check=True, capture_output=True, text=True)
            print("Flyway repair completed successfully using Maven:")
            print(result.stdout)
        else:
            # If Maven wrapper doesn't exist, try using mvn directly
            print("Maven wrapper not found, trying direct Maven command...")
            cmd = ["mvn", "flyway:repair", "-Dspring.profiles.active=prod"]
            result = subprocess.run(cmd, cwd=backend_path, check=True, capture_output=True, text=True)
            print("Flyway repair completed successfully:")
            print(result.stdout)
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error during Flyway repair: {e}")
        print(f"Error output: {e.stderr}")
        return False
    except FileNotFoundError:
        print("Maven not found. Please ensure Maven is installed and in your PATH.")
        return False


def manual_repair_sql():
    """Provide SQL commands for manual repair if needed"""
    sql_commands = """
-- Manual Flyway repair commands (if needed)
-- Connect to your database and run these commands:

-- 1. Check current migration status
SELECT * FROM flyway_schema_history ORDER BY installed_rank;

-- 2. If needed, repair using SQL
DELETE FROM flyway_schema_history WHERE version = '2';
DELETE FROM flyway_schema_history WHERE version = '3';

-- 3. Then re-run the migrations by starting the Spring Boot app with 'spring.flyway.clean-on-validation-error=true'
-- (Only in development! Never use clean-on-validation-error in production!)
"""
    print("Manual repair SQL commands:")
    print(sql_commands)


if __name__ == "__main__":
    print("P4 B2B Marketplace - Flyway Repair Script")
    print("=" * 50)
    
    success = repair_flyway_migrations()
    
    if not success:
        print("\nMaven-based repair failed. Here are manual repair options:")
        manual_repair_sql()
        print("\nAfter manual repair, try running the application again.")
    else:
        print("\nFlyway repair completed successfully. You can now start the application.")