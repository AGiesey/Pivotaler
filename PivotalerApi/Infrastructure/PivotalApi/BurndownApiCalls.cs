using System.Net.Http;

namespace Infrastructure.PivotalApi
{
  public class BurndownApiCalls
  {
    private readonly HttpClient client;
    private readonly JsonService jsonService;
    const string PivotalApiV5BaseUri = "https://www.pivotaltracker.com/services/v5";
    const string PaulsPivotalApiKey = "de3c3f98865f45ba9be2207777392782";
    const string PivotalKeyHeader = "X-TrackerToken";
    public BurndownApiCalls()
    {
      client = new HttpClient();
      jsonService = new JsonService();
    }
  }
}