#!/usr/bin/env python
"""
Test script to verify audio processing fixes work correctly.
Run this from the Django project directory.
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Project-Wave.settings')
django.setup()

from application.models import AudioProject
from application.audio_processor import AudioProcessor

def test_audio_processing():
    """Test audio processing with error handling"""
    print("Testing audio processing...")
    
    # Create a test project
    project = AudioProject.objects.create(
        name="Test Project",
        description="Testing file handling fixes",
        wave_type="sine",
        wave_parameters={
            "freq": 440,
            "spw": 100,
            "periods": 5
        },
        background_color="#000000",
        positive_color="#00FF00",
        negative_color="#00FFFF"
    )
    
    print(f"Created test project: {project.name} (ID: {project.id})")
    
    # Process the project
    processor = AudioProcessor()
    success, message = processor.process_audio_project(project)
    
    if success:
        print("✅ Processing completed successfully!")
        print(f"Modified file: {project.modified_file}")
        print(f"Final drawing: {project.final_drawing}")
        print(f"Natural lang: {project.natural_lang}")
        print(f"Wave comparison: {project.wave_comparison}")
    else:
        print(f"❌ Processing failed: {message}")
        print(f"Error details: {project.processing_error}")
    
    return success

def test_envelope_update():
    """Test envelope update functionality"""
    print("\nTesting envelope update...")
    
    # Get the test project
    try:
        project = AudioProject.objects.filter(name="Test Project").first()
        if not project:
            print("No test project found, creating one...")
            return test_audio_processing()
        
        # Create some test envelope data
        envelope_data = {
            'positive': [0.1, 0.2, 0.3, 0.2, 0.1] * 100,  # Sample envelope
            'negative': [-0.1, -0.2, -0.3, -0.2, -0.1] * 100
        }
        
        processor = AudioProcessor()
        success, message = processor.process_audio_project(project, envelope_data)
        
        if success:
            print("✅ Envelope update completed successfully!")
        else:
            print(f"❌ Envelope update failed: {message}")
        
        return success
        
    except Exception as e:
        print(f"❌ Error testing envelope update: {str(e)}")
        return False

def cleanup_test_projects():
    """Clean up test projects"""
    print("\nCleaning up test projects...")
    test_projects = AudioProject.objects.filter(name="Test Project")
    count = test_projects.count()
    test_projects.delete()
    print(f"Deleted {count} test projects")

if __name__ == "__main__":
    print("🎵 Audio Processing Test Suite")
    print("=" * 40)
    
    try:
        # Test basic processing
        success1 = test_audio_processing()
        
        # Test envelope updates
        success2 = test_envelope_update()
        
        print("\n" + "=" * 40)
        print("📊 Test Results:")
        print(f"Basic Processing: {'✅ PASS' if success1 else '❌ FAIL'}")
        print(f"Envelope Update: {'✅ PASS' if success2 else '❌ FAIL'}")
        
        if success1 and success2:
            print("\n🎉 All tests passed! File handling issues should be resolved.")
        else:
            print("\n⚠️ Some tests failed. Check the error messages above.")
        
        # Cleanup
        cleanup_response = input("\nClean up test projects? (y/N): ")
        if cleanup_response.lower() == 'y':
            cleanup_test_projects()
            
    except Exception as e:
        print(f"\n💥 Test suite crashed: {str(e)}")
        import traceback
        traceback.print_exc()
    
    print("\nTest complete.")