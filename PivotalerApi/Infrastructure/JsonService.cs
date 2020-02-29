using System.Text.Json;

namespace Infrastructure
{
  public class JsonService : IJsonService
  {
    public T JsonStringToObject<T>(string jsonString)
    {
      var options = new JsonSerializerOptions
      {
          PropertyNameCaseInsensitive = true,
      };
      
      return JsonSerializer.Deserialize<T>(jsonString, options);
    }
  }

  public interface IJsonService
  {
    T JsonStringToObject<T>(string jsonString);
  }
}