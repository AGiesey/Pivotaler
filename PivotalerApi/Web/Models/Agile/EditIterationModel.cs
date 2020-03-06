using System;

namespace Web.Models.Agile
{
  public class EditIterationModel
  {
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int InitialPoints { get; set; }
    public int? InitialEverhourPoints { get; set; }
  }
}