using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Infrastructure.PivotalApi
{
  public class BurndownApiCalls : IBurndownApiCalls
  {
    private readonly HttpClient client;
    private readonly IJsonService jsonService;
    const string PivotalApiV5BaseUri = "https://www.pivotaltracker.com/services/v5";
    const string AdamsPivotalApiKey = "07378ad4d71dd40a76f8e787ac1b75ab";
    const string PivotalKeyHeader = "X-TrackerToken";
    public BurndownApiCalls(IJsonService jsonService)
    {
      client = new HttpClient();
      this.jsonService = jsonService;
    }

    public Task<string> GetBurndown(DateTime startDate, DateTime endDate)
    {
      return Task.FromResult($"{startDate.ToString()} {endDate.ToString()}");
    }
  }

  public interface IBurndownApiCalls
  {
    Task<string> GetBurndown(DateTime startDate, DateTime endDate);
  }
}