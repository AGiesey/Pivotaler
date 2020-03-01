using NUnit.Framework;
using Infrastructure.Burndown;

namespace Test.Infrastructure.Tests.Burndown
{
  [TestFixture]
  public class DatapointServiceTests
  {
    private readonly DatapointService datapointService;

    public DatapointServiceTests()
    {
      this.datapointService = new DatapointService();
    }
    [Test]
    public void TestRuns() 
    {
      datapointService.MakeDatapoint();
    }
  }
}