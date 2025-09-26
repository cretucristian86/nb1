import random
import sqlite3
from datetime import datetime

class SerialNumberGenerator:
    def __init__(self, db_path='serial_numbers.db'):
        self.db_path = db_path
        self.setup_database()

    def setup_database(self):
        """Initialize SQLite database to store generated serial numbers"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS serial_numbers (
                nr_crt INTEGER PRIMARY KEY AUTOINCREMENT,    
                serial_number TEXT UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()

    def is_number_unique(self, number):
        """Check if a serial number already exists in the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT 1 FROM serial_numbers WHERE serial_number = ?', (number,))
        exists = cursor.fetchone() is not None
        conn.close()
        return not exists

    def save_number(self, number):
        """Save a generated serial number to the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO serial_numbers (serial_number) VALUES (?)', (number,))
        conn.commit()
        conn.close()

    def generate_serial_number(self):
        """Generate a unique 13-digit serial number starting with 1421"""
        while True:
            # Generate 9 random digits (13 - 4 prefix digits)
            random_digits = ''.join([str(random.randint(0, 9)) for _ in range(9)])
            serial_number = f"1421{random_digits}"
            
            # Check if the number is unique in our database
            if self.is_number_unique(serial_number):
                self.save_number(serial_number)
                return serial_number

    def generate_batch(self, count):
        """Generate a batch of unique serial numbers"""
        return [self.generate_serial_number() for _ in range(count)]

def main():
    generator = SerialNumberGenerator()
    
    while True:
        print("\nProduct Serial Number Generator")
        print("1. Generate single serial number")
        print("2. Generate batch of serial numbers")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ")
        
        if choice == '1':
            serial = generator.generate_serial_number()
            print(f"\nGenerated Serial Number: {serial}")
            
        elif choice == '2':
            try:
                count = int(input("Enter the number of serial numbers to generate: "))
                if count <= 0:
                    print("Please enter a positive number.")
                    continue
                
                serials = generator.generate_batch(count)
                print("\nGenerated Serial Numbers:")
                for i, serial in enumerate(serials, 1):
                    print(f"{i}. {serial}")
                
                # Save to file
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"serial_numbers_{timestamp}.txt"
                with open(filename, 'w') as f:
                    for i,serial in enumerate(serials,1):
                        f.write(f"{serial}\n")
                print(f"\nSerial numbers have been saved to {filename}")
                
            except ValueError:
                print("Please enter a valid number.")
                
        elif choice == '3':
            print("Goodbye!")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()