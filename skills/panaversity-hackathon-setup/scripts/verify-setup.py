#!/usr/bin/env python3
"""
Script to verify the setup of the Physical AI & Humanoid Robotics project.
This script checks if all components are properly configured and running.
"""

import subprocess
import sys
import os
import requests
import socket
from pathlib import Path

def check_port(port):
    """Check if a port is open."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def check_backend():
    """Check if the backend is running."""
    try:
        response = requests.get('http://localhost:8000/health', timeout=5)
        if response.status_code == 200 and response.json().get('status') == 'ok':
            print("✅ Backend server is running and healthy")
            return True
        else:
            print("❌ Backend server is running but not healthy")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Backend server is not running (port 8000)")
        return False
    except Exception as e:
        print(f"❌ Error checking backend: {e}")
        return False

def check_frontend():
    """Check if the frontend is running."""
    try:
        response = requests.get('http://localhost:3000/physical-ai-hackathon/', timeout=5)
        if response.status_code == 200:
            print("✅ Frontend server is running")
            return True
        else:
            print(f"❌ Frontend server is running but returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Frontend server is not running (port 3000)")
        return False
    except Exception as e:
        print(f"❌ Error checking frontend: {e}")
        return False

def check_python_environment():
    """Check if Python environment is properly set up."""
    try:
        # Check if we're in a virtual environment
        in_venv = (
            hasattr(sys, 'real_prefix') or (
                hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix
            )
        )

        if in_venv:
            print("✅ Python virtual environment is active")
        else:
            print("⚠️  Python virtual environment is not active (recommended for development)")

        # Check for required packages
        import fastapi
        import uvicorn
        import openai
        import qdrant_client
        print("✅ Required Python packages are installed")

        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        return False
    except Exception as e:
        print(f"❌ Error checking Python environment: {e}")
        return False

def check_node_environment():
    """Check if Node.js environment is properly set up."""
    try:
        # Check if npm is available
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print(f"✅ Node.js/npm is available (version: {result.stdout.strip()})")
        else:
            print("❌ Node.js/npm is not available")
            return False

        # Check if frontend dependencies are installed
        frontend_path = Path(__file__).parent.parent.parent / "frontend"
        package_json = frontend_path / "package.json"
        node_modules = frontend_path / "node_modules"

        if package_json.exists():
            if node_modules.exists():
                print("✅ Frontend dependencies are installed")
            else:
                print("⚠️  Frontend dependencies not installed. Run 'npm install' in frontend directory")
        else:
            print("❌ package.json not found in frontend directory")
            return False

        return True
    except subprocess.TimeoutExpired:
        print("❌ npm command timed out")
        return False
    except FileNotFoundError:
        print("❌ npm is not installed or not in PATH")
        return False
    except Exception as e:
        print(f"❌ Error checking Node.js environment: {e}")
        return False

def check_environment_variables():
    """Check if required environment variables are set."""
    required_vars = ['OPENAI_API_KEY']
    optional_vars = ['QDRANT_HOST', 'QDRANT_PORT', 'QDRANT_API_KEY', 'POSTGRES_DSN']

    all_good = True

    for var in required_vars:
        if os.getenv(var):
            print(f"✅ Required environment variable {var} is set")
        else:
            print(f"❌ Required environment variable {var} is not set")
            all_good = False

    for var in optional_vars:
        if os.getenv(var):
            print(f"✅ Optional environment variable {var} is set")
        else:
            print(f"ℹ️  Optional environment variable {var} is not set")

    return all_good

def check_rag_functionality():
    """Test RAG functionality."""
    try:
        response = requests.post(
            'http://localhost:8000/api/chat',
            json={'query': 'test', 'context': 'test'},
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            if 'answer' in data and 'source_context' in data:
                print("✅ RAG API is functional")
                return True
            else:
                print("❌ RAG API returned unexpected format")
                return False
        else:
            print(f"❌ RAG API returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to RAG API (is backend running?)")
        return False
    except Exception as e:
        print(f"❌ Error testing RAG functionality: {e}")
        return False

def main():
    """Main function to run all checks."""
    print("🔍 Verifying Physical AI & Humanoid Robotics Project Setup")
    print("=" * 60)

    checks = [
        ("Python Environment", check_python_environment),
        ("Environment Variables", check_environment_variables),
        ("Backend Server (port 8000)", lambda: check_backend() if check_port(8000) else print("❌ Backend port 8000 is not open") or False),
        ("Frontend Dependencies", check_node_environment),
        ("Frontend Server (port 3000)", lambda: check_frontend() if check_port(3000) else print("❌ Frontend port 3000 is not open") or False),
        ("RAG Functionality", check_rag_functionality),
    ]

    results = {}
    for check_name, check_func in checks:
        print(f"\n📋 Checking {check_name}...")
        results[check_name] = check_func()

    print("\n" + "=" * 60)
    print("📋 Setup Verification Summary:")

    all_passed = True
    for check_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status}: {check_name}")
        if not result:
            all_passed = False

    print("\n" + "=" * 60)
    if all_passed:
        print("🎉 All checks passed! The project is properly set up.")
    else:
        print("⚠️  Some checks failed. Please review the output above and address the issues.")
        sys.exit(1)

if __name__ == "__main__":
    main()