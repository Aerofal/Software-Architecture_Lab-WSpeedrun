import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches, Validate } from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// Custom Validator untuk mengecek Email tanpa Regex (Sesuai Aturan Lab)
@ValidatorConstraint({ name: 'customEmailValidator', async: false })
export class CustomEmailValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    if (!email) return false;
    
    // Harus ada tepat satu "@"
    const atCount = email.split('@').length - 1;
    if (atCount !== 1) return false;

    // Harus ada setidaknya satu "."
    if (!email.includes('.')) return false;

    // "@" dan "." tidak boleh bersebelahan
    if (email.includes('@.') || email.includes('.@')) return false;

    return true;
  }
}

// Custom Validator untuk mengecek Password tanpa Regex (Sesuai Aturan Lab)
@ValidatorConstraint({ name: 'customPasswordValidator', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    if (!password) return false;

    const hasUppercase = password.split('').some(char => char >= 'A' && char <= 'Z');
    const hasLowercase = password.split('').some(char => char >= 'a' && char <= 'z');
    const hasNumber = password.split('').some(char => char >= '0' && char <= '9');
    
    // Karakter spesial (bukan huruf dan bukan angka)
    const hasSpecial = password.split('').some(char => {
        const isLetter = (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
        const isNumber = char >= '0' && char <= '9';
        return !isLetter && !isNumber;
    });

    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @Validate(CustomEmailValidator, { message: 'Email tidak valid (harus memiliki 1 "@", minimal 1 ".", dan tidak bersebelahan)' })
  email!: string;

  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Validate(CustomPasswordValidator, { message: 'Password harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial' })
  password!: string; 
}