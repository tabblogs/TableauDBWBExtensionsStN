CREATE TABLE dbo.states 
(
  id int IDENTITY PRIMARY KEY CLUSTERED,
  userName varchar(50),
  stateName varchar(50),
  stateRank int
)

INSERT dbo.states
VALUES ('Elvis','Tennissee',1)

SELECT * FROM dbo.states