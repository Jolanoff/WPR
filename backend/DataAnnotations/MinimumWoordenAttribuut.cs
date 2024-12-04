using System.ComponentModel.DataAnnotations;

namespace backend.DataAnnotations
{
public class MinimumWoordenAttribuut : ValidationAttribute
{
private readonly int _minWords;

    public MinimumWoordenAttribuut(int minWords)
    {
        _minWords = minWords;
        ErrorMessage = $"De beschrijving moet minstens {_minWords} woorden bevatten.";
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string beschrijving && !string.IsNullOrWhiteSpace(beschrijving))
        {
            var wordCount = beschrijving.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
            if (wordCount >= _minWords)
            {
                return ValidationResult.Success;
            }
        }

        return new ValidationResult(ErrorMessage);
    }
}
}