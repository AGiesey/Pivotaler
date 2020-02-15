using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Infrastructure.PivotalApi.Models;

namespace Infrastructure.PivotalApi
{
  public class StoryApiCalls
  {
    private readonly HttpClient client;
    private readonly JsonService jsonService;
    const string PivotalApiV5BaseUri = "https://www.pivotaltracker.com/services/v5";
    const string PaulsPivotalApiKey = "de3c3f98865f45ba9be2207777392782";
    const string PivotalKeyHeader = "X-TrackerToken";
    public StoryApiCalls()
    {
      client = new HttpClient();
      jsonService = new JsonService();
    }

    public async Task<IEnumerable<Story>> GetSprintBacklogStories()
    {
      var projectId = 836745;

      var builder = new UriBuilder($"{PivotalApiV5BaseUri}/projects/{projectId}/stories");
      builder.Port = -1;

      var query = HttpUtility.ParseQueryString(builder.Query);
      query["filter"] = "labels:\"sprint backlog\"";

      builder.Query = query.ToString();

      using(var client = new HttpClient())
      {
          client.DefaultRequestHeaders.Add(PivotalKeyHeader, PaulsPivotalApiKey);
          
          var result = await client.GetStringAsync(builder.ToString());
          
          return jsonService.JsonStringToObject<IEnumerable<Story>>(result);
      }

    }

    public async Task<Story> GetStoryById(int id)
    {
      var projectId = 836745;

      var builder = new UriBuilder($"{PivotalApiV5BaseUri}/projects/{projectId}/stories/{id}");
      builder.Port = -1;

      using(var client = new HttpClient())
      {
          client.DefaultRequestHeaders.Add(PivotalKeyHeader, PaulsPivotalApiKey);

          var result = await client.GetStringAsync(builder.ToString());
          
          var story = jsonService.JsonStringToObject<Story>(result);
          
          return story;
      }
    }
  }
}