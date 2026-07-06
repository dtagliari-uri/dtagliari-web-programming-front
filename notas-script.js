const ENCRYPTED_ALUNOS_DB = "W3sicmEiOiIxMTAxOTQiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IkFMRVggSlVOSU9SIFNJTU9OIiwicHJvdmExIjo1LjI1LCJwcm92YTFfcGVzbzgiOjQuMiwicHJvdmEyIjo4LjI1LCJwcm92YTJfcGVzbzgiOjYuNiwidGRlIjoxLjYsImVuYWRlIjowLjYsImZpbmFsIjo3LjYsInBvcnRhbF9wcm92YTEiOjcsInBvcnRhbF9wcm92YTIiOjguMiwicG9ydGFsX2ZpbmFsIjo3LjZ9LHsicmEiOiIxMDk2OTkiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IsOCTkdFTE8gTFVJWiBHSVJPTEVUVE8iLCJwcm92YTEiOjkuNSwicHJvdmExX3Blc284Ijo3LjYsInByb3ZhMiI6OSwicHJvdmEyX3Blc284Ijo3LjIsInRkZSI6MiwiZW5hZGUiOjAuNSwiZmluYWwiOjkuOSwicG9ydGFsX3Byb3ZhMSI6OS44LCJwb3J0YWxfcHJvdmEyIjoxMCwicG9ydGFsX2ZpbmFsIjo5Ljl9LHsicmEiOiIxMTAwNzMiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IkJFUk5BUkRPIEJSQU5Ew4NPIiwicHJvdmExIjo0LCJwcm92YTFfcGVzbzgiOjMuMiwicHJvdmEyIjo5LjUsInByb3ZhMl9wZXNvOCI6Ny42LCJ0ZGUiOjIsImVuYWRlIjowLjgsImZpbmFsIjo4LjIsInBvcnRhbF9wcm92YTEiOjYuOCwicG9ydGFsX3Byb3ZhMiI6OS42LCJwb3J0YWxfZmluYWwiOjguMn0seyJyYSI6IjEwODQyOSIsInR1cm1hIjoiVDEiLCJub21lIjoiQkVSTkFSRE8gTFXDjVMgRE9TIFNBTlRPUyIsInByb3ZhMSI6NC43NSwicHJvdmExX3Blc284IjozLjgsInByb3ZhMiI6NS4yNSwicHJvdmEyX3Blc284Ijo0LjIsInRkZSI6MS42LCJlbmFkZSI6MC42LCJmaW5hbCI6Ni4yLCJwb3J0YWxfcHJvdmExIjo2LjYsInBvcnRhbF9wcm92YTIiOjUuOCwicG9ydGFsX2ZpbmFsIjo2LjJ9LHsicmEiOiIxMDg0MDciLCJ0dXJtYSI6IlQxIiwibm9tZSI6IkJSVU5PIEJBTERJR0EiLCJwcm92YTEiOjkuNSwicHJvdmExX3Blc284Ijo3LjYsInByb3ZhMiI6MTAsInByb3ZhMl9wZXNvOCI6OCwidGRlIjowLCJlbmFkZSI6MC45LCJmaW5hbCI6OC43LCJwb3J0YWxfcHJvdmExIjo4LjYsInBvcnRhbF9wcm92YTIiOjguNiwicG9ydGFsX2ZpbmFsIjo4LjZ9LHsicmEiOiIxMDg0NjgiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IkNBUk9MIEZFUlJFSVJBIFRPTUFaIiwicHJvdmExIjozLjUsInByb3ZhMV9wZXNvOCI6Mi44LCJwcm92YTIiOjgsInByb3ZhMl9wZXNvOCI6Ni40LCJ0ZGUiOjEuNCwiZW5hZGUiOjAuNCwiZmluYWwiOjYuNCwicG9ydGFsX3Byb3ZhMSI6NSwicG9ydGFsX3Byb3ZhMiI6Ny44LCJwb3J0YWxfZmluYWwiOjYuNH0seyJyYSI6IjEwODM4NCIsInR1cm1hIjoiVDEiLCJub21lIjoiRURTT00gUk9EUklHVUVTIENBU1NBTUFMSSBKVU5JT1IiLCJwcm92YTEiOjgsInByb3ZhMV9wZXNvOCI6Ni40LCJwcm92YTIiOjcuNSwicHJvdmEyX3Blc284Ijo2LCJ0ZGUiOjIsImVuYWRlIjowLjUsImZpbmFsIjo4LjcsInBvcnRhbF9wcm92YTEiOjguNCwicG9ydGFsX3Byb3ZhMiI6OSwicG9ydGFsX2ZpbmFsIjo4Ljd9LHsicmEiOiIxMDk2NDgiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IkVEVUFSRE8gSEVOUklRVUUgVEhPTUFaIiwicHJvdmExIjo5LjUsInByb3ZhMV9wZXNvOCI6Ny42LCJwcm92YTIiOjguNzUsInByb3ZhMl9wZXNvOCI6NywidGRlIjoxLjYsImVuYWRlIjowLjcsImZpbmFsIjo5LjYsInBvcnRhbF9wcm92YTEiOjkuNiwicG9ydGFsX3Byb3ZhMiI6OS42LCJwb3J0YWxfZmluYWwiOjkuNn0seyJyYSI6IjEwODM0NCIsInR1cm1hIjoiVDEiLCJub21lIjoiR0FCUklFTCBEQVZJRCBSSUJFSVJPIERBIFNJTFZBIiwicHJvdmExIjo2LjUsInByb3ZhMV9wZXNvOCI6NS4yLCJwcm92YTIiOjUuNzUsInByb3ZhMl9wZXNvOCI6NC42LCJ0ZGUiOjEuNywiZW5hZGUiOjAuNCwiZmluYWwiOjcsInBvcnRhbF9wcm92YTEiOjYuOSwicG9ydGFsX3Byb3ZhMiI6Ny4xLCJwb3J0YWxfZmluYWwiOjd9LHsicmEiOiIxMDg0MTQiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IkhFTlJJUVVFIEFMQkEgVE9NQVpPTkkiLCJwcm92YTEiOjMuNSwicHJvdmExX3Blc284IjoyLjgsInByb3ZhMiI6OS41LCJwcm92YTJfcGVzbzgiOjcuNiwidGRlIjoxLjgsImVuYWRlIjowLjQsImZpbmFsIjo3LjQsInBvcnRhbF9wcm92YTEiOjUuNCwicG9ydGFsX3Byb3ZhMiI6OS40LCJwb3J0YWxfZmluYWwiOjcuNH0seyJyYSI6IjEwOTUwOCIsInR1cm1hIjoiVDEiLCJub21lIjoiSk/Dg08gVsONVE9SIEFaQU1CVUpBIiwicHJvdmExIjo4LjI1LCJwcm92YTFfcGVzbzgiOjYuNiwicHJvdmEyIjo5LCJwcm92YTJfcGVzbzgiOjcuMiwidGRlIjoyLCJlbmFkZSI6MC43LCJmaW5hbCI6OS42LCJwb3J0YWxfcHJvdmExIjoxMCwicG9ydGFsX3Byb3ZhMiI6OS4yLCJwb3J0YWxfZmluYWwiOjkuNn0seyJyYSI6IjEwOTk2NyIsInR1cm1hIjoiVDEiLCJub21lIjoiSk9ITiBPTElWRVIgT0xJVkVJUkEgREEgU0lMVkEiLCJwcm92YTEiOjEwLCJwcm92YTFfcGVzbzgiOjgsInByb3ZhMiI6Ny41LCJwcm92YTJfcGVzbzgiOjYsInRkZSI6MS4yLCJlbmFkZSI6MC43LCJmaW5hbCI6OC45LCJwb3J0YWxfcHJvdmExIjo5LjIsInBvcnRhbF9wcm92YTIiOjguNiwicG9ydGFsX2ZpbmFsIjo4Ljl9LHsicmEiOiIxMDgzOTMiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IktBVUFORSBaSUNBVE8iLCJwcm92YTEiOjQuNzUsInByb3ZhMV9wZXNvOCI6My44LCJwcm92YTIiOjkuMjUsInByb3ZhMl9wZXNvOCI6Ny40LCJ0ZGUiOjEuNCwiZW5hZGUiOjAuNywiZmluYWwiOjcuNywicG9ydGFsX3Byb3ZhMSI6Ni42LCJwb3J0YWxfcHJvdmEyIjo4LjgsInBvcnRhbF9maW5hbCI6Ny43fSx7InJhIjoiMTA5ODE1IiwidHVybWEiOiJUMSIsIm5vbWUiOiJMQUlTIEFOVFVORVMgRE9TIFNBTlRPUyIsInByb3ZhMSI6NS41LCJwcm92YTFfcGVzbzgiOjQuNCwicHJvdmEyIjo3LjUsInByb3ZhMl9wZXNvOCI6NiwidGRlIjoxLjUsImVuYWRlIjowLjUsImZpbmFsIjo3LjIsInBvcnRhbF9wcm92YTEiOjYuOSwicG9ydGFsX3Byb3ZhMiI6Ny41LCJwb3J0YWxfZmluYWwiOjcuMn0seyJyYSI6IjEwODU0MCIsInR1cm1hIjoiVDEiLCJub21lIjoiTEVWSSBERSBTT1VTQSBHUk9ORU5TQ0hJTEQiLCJwcm92YTEiOjkuNSwicHJvdmExX3Blc284Ijo3LjYsInByb3ZhMiI6Ni41LCJwcm92YTJfcGVzbzgiOjUuMiwidGRlIjoyLCJlbmFkZSI6MC40LCJmaW5hbCI6OC44LCJwb3J0YWxfcHJvdmExIjo5LjYsInBvcnRhbF9wcm92YTIiOjgsInBvcnRhbF9maW5hbCI6OC44fSx7InJhIjoiMTA4Mzg3IiwidHVybWEiOiJUMSIsIm5vbWUiOiJMVUNBUyBCT0dPIERPUyBTQU5UT1MiLCJwcm92YTEiOjYuNzUsInByb3ZhMV9wZXNvOCI6NS40LCJwcm92YTIiOjcuNzUsInByb3ZhMl9wZXNvOCI6Ni4yLCJ0ZGUiOjIsImVuYWRlIjowLjYsImZpbmFsIjo4LjQsInBvcnRhbF9wcm92YTEiOjguNiwicG9ydGFsX3Byb3ZhMiI6OC4yLCJwb3J0YWxfZmluYWwiOjguNH0seyJyYSI6IjEwODMyMiIsInR1cm1hIjoiVDEiLCJub21lIjoiTUFSQ0VMIExFT05BUkRPIENPUlJFQSIsInByb3ZhMSI6OC4yNSwicHJvdmExX3Blc284Ijo2LjYsInByb3ZhMiI6OCwicHJvdmEyX3Blc284Ijo2LjQsInRkZSI6MS42LCJlbmFkZSI6MC43LCJmaW5hbCI6OC44LCJwb3J0YWxfcHJvdmExIjo4LjIsInBvcnRhbF9wcm92YTIiOjkuNCwicG9ydGFsX2ZpbmFsIjo4Ljh9LHsicmEiOiIxMDg0MDYiLCJ0dXJtYSI6IlQxIiwibm9tZSI6Ik1BUkNPIEFOVMOUTklPIEJBUlJPIFRPUlRFTExJIiwicHJvdmExIjoxMCwicHJvdmExX3Blc284Ijo4LCJwcm92YTIiOjcsInByb3ZhMl9wZXNvOCI6NS42LCJ0ZGUiOjEuOCwiZW5hZGUiOjAuNiwiZmluYWwiOjkuMiwicG9ydGFsX3Byb3ZhMSI6OS44LCJwb3J0YWxfcHJvdmEyIjo4LjYsInBvcnRhbF9maW5hbCI6OS4yfSx7InJhIjoiMTA4MjkxIiwidHVybWEiOiJUMSIsIm5vbWUiOiJNQVRFVVMgQ0FET1JFIiwicHJvdmExIjo3LCJwcm92YTFfcGVzbzgiOjUuNiwicHJvdmEyIjo0LCJwcm92YTJfcGVzbzgiOjMuMiwidGRlIjowLCJlbmFkZSI6MC40LCJmaW5hbCI6NC44LCJwb3J0YWxfcHJvdmExIjo1LjYsInBvcnRhbF9wcm92YTIiOjQsInBvcnRhbF9maW5hbCI6NC44fSx7InJhIjoiMTA4MzcyIiwidHVybWEiOiJUMSIsIm5vbWUiOiJNSUdVRUwgw4FMVkFSTyBNT05URU1FWlpPIiwicHJvdmExIjo5LCJwcm92YTFfcGVzbzgiOjcuMiwicHJvdmEyIjo5Ljc1LCJwcm92YTJfcGVzbzgiOjcuOCwidGRlIjoxLjgsImVuYWRlIjowLjYsImZpbmFsIjo5LjksInBvcnRhbF9wcm92YTEiOjkuOSwicG9ydGFsX3Byb3ZhMiI6OS45LCJwb3J0YWxfZmluYWwiOjkuOX0seyJyYSI6IjEwODM5MCIsInR1cm1hIjoiVDEiLCJub21lIjoiUEVEUk8gREFMTEEgUk9TQSBCQUxESSIsInByb3ZhMSI6OCwicHJvdmExX3Blc284Ijo2LjQsInByb3ZhMiI6OCwicHJvdmEyX3Blc284Ijo2LjQsInRkZSI6MS44LCJlbmFkZSI6MC41LCJmaW5hbCI6OC43LCJwb3J0YWxfcHJvdmExIjo5LjIsInBvcnRhbF9wcm92YTIiOjguMiwicG9ydGFsX2ZpbmFsIjo4Ljd9LHsicmEiOiIxMDg0MDgiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IlJBRkFFTCBERSBPTElWRUlSQSIsInByb3ZhMSI6Ni43NSwicHJvdmExX3Blc284Ijo1LjQsInByb3ZhMiI6Ni4yNSwicHJvdmEyX3Blc284Ijo1LCJ0ZGUiOjEuOCwiZW5hZGUiOjAsImZpbmFsIjo3LCJwb3J0YWxfcHJvdmExIjo3LjIsInBvcnRhbF9wcm92YTIiOjYuOCwicG9ydGFsX2ZpbmFsIjo3fSx7InJhIjoiMTA4NDUxIiwidHVybWEiOiJUMSIsIm5vbWUiOiJSQUZBRUwgSEVOUklRVUUgU0NITkVJREVSIiwicHJvdmExIjoxMCwicHJvdmExX3Blc284Ijo4LCJwcm92YTIiOjkuNzUsInByb3ZhMl9wZXNvOCI6Ny44LCJ0ZGUiOjEuOCwiZW5hZGUiOjAuNiwiZmluYWwiOjEwLCJwb3J0YWxfcHJvdmExIjoxMCwicG9ydGFsX3Byb3ZhMiI6MTAsInBvcnRhbF9maW5hbCI6MTB9LHsicmEiOiIxMDgzODUiLCJ0dXJtYSI6IlQxIiwibm9tZSI6IlJFTkFOIEtPTkNJS09TS0kgQUJFTCIsInByb3ZhMSI6Ni43NSwicHJvdmExX3Blc284Ijo1LjQsInByb3ZhMiI6NS43NSwicHJvdmEyX3Blc284Ijo0LjYsInRkZSI6MiwiZW5hZGUiOjAuMywiZmluYWwiOjcuMywicG9ydGFsX3Byb3ZhMSI6Ny40LCJwb3J0YWxfcHJvdmEyIjo3LjIsInBvcnRhbF9maW5hbCI6Ny4zfSx7InJhIjoiMTA4MzY2IiwidHVybWEiOiJUMSIsIm5vbWUiOiJSVUFOIEZFUlJFSVJBIENBU0FST1RUTyIsInByb3ZhMSI6Ni43NSwicHJvdmExX3Blc284Ijo1LjQsInByb3ZhMiI6Ny41LCJwcm92YTJfcGVzbzgiOjYsInRkZSI6MS44LCJlbmFkZSI6MC41LCJmaW5hbCI6OCwicG9ydGFsX3Byb3ZhMSI6OC4yLCJwb3J0YWxfcHJvdmEyIjo3LjgsInBvcnRhbF9maW5hbCI6OH0seyJyYSI6IjEwODM3OCIsInR1cm1hIjoiVDIiLCJub21lIjoiRURVQVJETyBFTlJJUVVFIEZBQklTSUFLIiwicHJvdmExIjoxMCwicHJvdmExX3Blc284Ijo4LCJwcm92YTIiOjkuMjUsInByb3ZhMl9wZXNvOCI6Ny40LCJ0ZGUiOjIuMiwiZW5hZGUiOjAuNSwiZmluYWwiOjEwLCJwb3J0YWxfcHJvdmExIjoxMCwicG9ydGFsX3Byb3ZhMiI6MTAsInBvcnRhbF9maW5hbCI6MTB9LHsicmEiOiIxMDg1MTQiLCJ0dXJtYSI6IlQyIiwibm9tZSI6IkVSSUNLIEpIRUlNRVMgQklFTklFSyIsInByb3ZhMSI6NS4yNSwicHJvdmExX3Blc284Ijo0LjIsInByb3ZhMiI6OC4yNSwicHJvdmEyX3Blc284Ijo2LjYsInRkZSI6Mi4yLCJlbmFkZSI6MC44LCJmaW5hbCI6OC40LCJwb3J0YWxfcHJvdmExIjo4LjIsInBvcnRhbF9wcm92YTIiOjguNiwicG9ydGFsX2ZpbmFsIjo4LjR9LHsicmEiOiIxMDgyNDkiLCJ0dXJtYSI6IlQyIiwibm9tZSI6IkZFTElQRSBDQVNBIFJJR08iLCJwcm92YTEiOjkuNzUsInByb3ZhMV9wZXNvOCI6Ny44LCJwcm92YTIiOjcuNzUsInByb3ZhMl9wZXNvOCI6Ni4yLCJ0ZGUiOjIuMiwiZW5hZGUiOjAuNSwiZmluYWwiOjkuNywicG9ydGFsX3Byb3ZhMSI6OS44LCJwb3J0YWxfcHJvdmEyIjo5LjYsInBvcnRhbF9maW5hbCI6OS43fSx7InJhIjoiMTA4NjYzIiwidHVybWEiOiJUMiIsIm5vbWUiOiJHQUJSSUVMIEZSRUlSRSBMQVpaQVJFIiwicHJvdmExIjo1LjI1LCJwcm92YTFfcGVzbzgiOjQuMiwicHJvdmEyIjo2LjUsInByb3ZhMl9wZXNvOCI6NS4yLCJ0ZGUiOjIuMiwiZW5hZGUiOjAuNCwiZmluYWwiOjcuMywicG9ydGFsX3Byb3ZhMSI6Ny40LCJwb3J0YWxfcHJvdmEyIjo3LjIsInBvcnRhbF9maW5hbCI6Ny4zfSx7InJhIjoiOTMyNzgiLCJ0dXJtYSI6IlQyIiwibm9tZSI6IkdBQlJJRUwgTk9WRUxPIEpBVk9STklLIiwicHJvdmExIjo1LjUsInByb3ZhMV9wZXNvOCI6NC40LCJwcm92YTIiOjYuNSwicHJvdmEyX3Blc284Ijo1LjIsInRkZSI6Mi4yLCJlbmFkZSI6MC42LCJmaW5hbCI6Ny42LCJwb3J0YWxfcHJvdmExIjo4LCJwb3J0YWxfcHJvdmEyIjo3LjIsInBvcnRhbF9maW5hbCI6Ny42fSx7InJhIjoiMTA5MjYyIiwidHVybWEiOiJUMiIsIm5vbWUiOiJHUkFaSUVMSSBKVUxJQSBQSUVLQVMiLCJwcm92YTEiOjMuNSwicHJvdmExX3Blc284IjoyLjgsInByb3ZhMiI6NC43NSwicHJvdmEyX3Blc284IjozLjgsInRkZSI6Mi4yLCJlbmFkZSI6MC41LCJmaW5hbCI6NiwicG9ydGFsX3Byb3ZhMSI6Ni4yLCJwb3J0YWxfcHJvdmEyIjo1LjgsInBvcnRhbF9maW5hbCI6Nn0seyJyYSI6IjEwODQyNSIsInR1cm1hIjoiVDIiLCJub21lIjoiR1VJTEhFUk1FIENFTlRFTkFSTyIsInByb3ZhMSI6OS4yNSwicHJvdmExX3Blc284Ijo3LjQsInByb3ZhMiI6MTAsInByb3ZhMl9wZXNvOCI6OCwidGRlIjoxLjQsImVuYWRlIjowLjYsImZpbmFsIjo5LjcsInBvcnRhbF9wcm92YTEiOjkuNywicG9ydGFsX3Byb3ZhMiI6OS43LCJwb3J0YWxfZmluYWwiOjkuN30seyJyYSI6IjEwODQzOSIsInR1cm1hIjoiVDIiLCJub21lIjoiR1VTVEFWTyBIRU5SSVFVRSBDQVNUQUxESSBUSUJVUlNLSSIsInByb3ZhMSI6NCwicHJvdmExX3Blc284IjozLjIsInByb3ZhMiI6My4yNSwicHJvdmEyX3Blc284IjoyLjYsInRkZSI6MiwiZW5hZGUiOjAuMywiZmluYWwiOjUuMiwicG9ydGFsX3Byb3ZhMSI6NSwicG9ydGFsX3Byb3ZhMiI6NS40LCJwb3J0YWxfZmluYWwiOjUuMn0seyJyYSI6IjEwODExMiIsInR1cm1hIjoiVDIiLCJub21lIjoiSEVOUklRVUUgSk9Tw4kgR0lBQ09NRUwgTkVUTyIsInByb3ZhMSI6NS41LCJwcm92YTFfcGVzbzgiOjQuNCwicHJvdmEyIjo2LjUsInByb3ZhMl9wZXNvOCI6NS4yLCJ0ZGUiOjIsImVuYWRlIjowLjUsImZpbmFsIjo3LjMsInBvcnRhbF9wcm92YTEiOjcuNCwicG9ydGFsX3Byb3ZhMiI6Ny4yLCJwb3J0YWxfZmluYWwiOjcuM30seyJyYSI6IjEwODUwMCIsInR1cm1hIjoiVDIiLCJub21lIjoiSEVOUklRVUUgVklFSVJBIiwicHJvdmExIjo5LjI1LCJwcm92YTFfcGVzbzgiOjcuNCwicHJvdmEyIjo5Ljc1LCJwcm92YTJfcGVzbzgiOjcuOCwidGRlIjoyLCJlbmFkZSI6MC45LCJmaW5hbCI6MTAsInBvcnRhbF9wcm92YTEiOjEwLCJwb3J0YWxfcHJvdmEyIjoxMCwicG9ydGFsX2ZpbmFsIjoxMH0seyJyYSI6IjEwODQzMyIsInR1cm1hIjoiVDIiLCJub21lIjoiSk/Dg08gSEVOUklRVUUgQU5UT05JQVpaSSIsInByb3ZhMSI6MTAsInByb3ZhMV9wZXNvOCI6OCwicHJvdmEyIjoxMCwicHJvdmEyX3Blc284Ijo4LCJ0ZGUiOjIsImVuYWRlIjowLjcsImZpbmFsIjoxMCwicG9ydGFsX3Byb3ZhMSI6MTAsInBvcnRhbF9wcm92YTIiOjEwLCJwb3J0YWxfZmluYWwiOjEwfSx7InJhIjoiNDI4NDEiLCJ0dXJtYSI6IlQyIiwibm9tZSI6IkpPw4NPIFZJQ1RPUiBWRURPVkFUTyIsInByb3ZhMSI6Ny4yNSwicHJvdmExX3Blc284Ijo1LjgsInByb3ZhMiI6OC4yNSwicHJvdmEyX3Blc284Ijo2LjYsInRkZSI6Mi4yLCJlbmFkZSI6MC42LCJmaW5hbCI6OSwicG9ydGFsX3Byb3ZhMSI6OS40LCJwb3J0YWxfcHJvdmEyIjo4LjYsInBvcnRhbF9maW5hbCI6OX0seyJyYSI6IjEwODg1OSIsInR1cm1hIjoiVDIiLCJub21lIjoiSk9BTyBWSVRPUiBCVVNFVFRPIE1FTkVaRVMiLCJwcm92YTEiOjQuMjUsInByb3ZhMV9wZXNvOCI6My40LCJwcm92YTIiOjUuMjUsInByb3ZhMl9wZXNvOCI6NC4yLCJ0ZGUiOjIsImVuYWRlIjowLjUsImZpbmFsIjo2LjMsInBvcnRhbF9wcm92YTEiOjYuNCwicG9ydGFsX3Byb3ZhMiI6Ni4yLCJwb3J0YWxfZmluYWwiOjYuM30seyJyYSI6IjEwODQwNSIsInR1cm1hIjoiVDIiLCJub21lIjoiSk9ITlkgQ1JJU1RJQU4gQk9MSVMiLCJwcm92YTEiOjUuNzUsInByb3ZhMV9wZXNvOCI6NC42LCJwcm92YTIiOjksInByb3ZhMl9wZXNvOCI6Ny4yLCJ0ZGUiOjIuMiwiZW5hZGUiOjAuNSwiZmluYWwiOjguNiwicG9ydGFsX3Byb3ZhMSI6OCwicG9ydGFsX3Byb3ZhMiI6OS4yLCJwb3J0YWxfZmluYWwiOjguNn0seyJyYSI6IjEwNDU0MyIsInR1cm1hIjoiVDIiLCJub21lIjoiTFVDQVMgTUFSQ0VMTyBOQUdFTCBTVFJBQ0tFIiwicHJvdmExIjoxMCwicHJvdmExX3Blc284Ijo4LCJwcm92YTIiOjguNzUsInByb3ZhMl9wZXNvOCI6NywidGRlIjoyLCJlbmFkZSI6MC45LCJmaW5hbCI6MTAsInBvcnRhbF9wcm92YTEiOjEwLCJwb3J0YWxfcHJvdmEyIjoxMCwicG9ydGFsX2ZpbmFsIjoxMH0seyJyYSI6IjEwODQyMyIsInR1cm1hIjoiVDIiLCJub21lIjoiTFVDSUFOTyBFRFVBUkRPIEFMTEVCUkFORFQiLCJwcm92YTEiOjguNSwicHJvdmExX3Blc284Ijo2LjgsInByb3ZhMiI6Ny43NSwicHJvdmEyX3Blc284Ijo2LjIsInRkZSI6Mi4yLCJlbmFkZSI6MC40LCJmaW5hbCI6OS4xLCJwb3J0YWxfcHJvdmExIjo4LjgsInBvcnRhbF9wcm92YTIiOjkuNCwicG9ydGFsX2ZpbmFsIjo5LjF9LHsicmEiOiIxMDg2MzYiLCJ0dXJtYSI6IlQyIiwibm9tZSI6Ik1BUklBIEVEVUFSREEgRkFMS09TS0kiLCJwcm92YTEiOjguNSwicHJvdmExX3Blc284Ijo2LjgsInByb3ZhMiI6OC43NSwicHJvdmEyX3Blc284Ijo3LCJ0ZGUiOjIuMiwiZW5hZGUiOjAuNSwiZmluYWwiOjkuNiwicG9ydGFsX3Byb3ZhMSI6OSwicG9ydGFsX3Byb3ZhMiI6OS4yLCJwb3J0YWxfZmluYWwiOjkuNn0seyJyYSI6IjEwODQwMyIsInR1cm1hIjoiVDIiLCJub21lIjoiTUFURVVTIEFOVFVORVMgUElOVE8iLCJwcm92YTEiOjUuMjUsInByb3ZhMV9wZXNvOCI6NC4yLCJwcm92YTIiOjYuMjUsInByb3ZhMl9wZXNvOCI6NSwidGRlIjoyLjIsImVuYWRlIjowLjQsImZpbmFsIjo3LjIsInBvcnRhbF9wcm92YTEiOjcuNCwicG9ydGFsX3Byb3ZhMiI6NywicG9ydGFsX2ZpbmFsIjo3LjJ9LHsicmEiOiI0MDMwNyIsInR1cm1hIjoiVDIiLCJub21lIjoiTUFUSEVVUyBMT1BFUyBDT0xPU1NJIiwicHJvdmExIjo3LCJwcm92YTFfcGVzbzgiOjUuNiwicHJvdmEyIjo1LjI1LCJwcm92YTJfcGVzbzgiOjQuMiwidGRlIjoyLjIsImVuYWRlIjowLjksImZpbmFsIjo4LCJwb3J0YWxfcHJvdmExIjo3LjYsInBvcnRhbF9wcm92YTIiOjguNCwicG9ydGFsX2ZpbmFsIjo4fSx7InJhIjoiMTA4NjMwIiwidHVybWEiOiJUMiIsIm5vbWUiOiJNQVVSw41DSU8gSk9Tw4kgSEFJRFVDSyIsInByb3ZhMSI6OCwicHJvdmExX3Blc284Ijo2LjQsInByb3ZhMiI6NywicHJvdmEyX3Blc284Ijo1LjYsInRkZSI6MiwiZW5hZGUiOjAuNSwiZmluYWwiOjguNSwicG9ydGFsX3Byb3ZhMSI6OC40LCJwb3J0YWxfcHJvdmEyIjo4LjYsInBvcnRhbF9maW5hbCI6OC41fSx7InJhIjoiMTA4NDEyIiwidHVybWEiOiJUMiIsIm5vbWUiOiJQRURSTyBBVUdVU1RPIEVTTUVMSU5EUk8gRkFMQ8ODTyIsInByb3ZhMSI6OC41LCJwcm92YTFfcGVzbzgiOjYuOCwicHJvdmEyIjo4LjUsInByb3ZhMl9wZXNvOCI6Ni44LCJ0ZGUiOjIsImVuYWRlIjowLjUsImZpbmFsIjo5LjMsInBvcnRhbF9wcm92YTEiOjkuOCwicG9ydGFsX3Byb3ZhMiI6OC44LCJwb3J0YWxfZmluYWwiOjkuM30seyJyYSI6IjQxMDQ3IiwidHVybWEiOiJUMiIsIm5vbWUiOiJQRURSTyBTQU5USU4gTU9OVEVNRVNTTyIsInByb3ZhMSI6Ni41LCJwcm92YTFfcGVzbzgiOjUuMiwicHJvdmEyIjo1LCJwcm92YTJfcGVzbzgiOjQsInRkZSI6MS42LCJlbmFkZSI6MC44LCJmaW5hbCI6NywicG9ydGFsX3Byb3ZhMSI6Ni44LCJwb3J0YWxfcHJvdmEyIjo3LjIsInBvcnRhbF9maW5hbCI6N30seyJyYSI6IjEwODE5MCIsInR1cm1hIjoiVDIiLCJub21lIjoiUkFGQUVMIEPDiVNBUiBNSUNIQUxDWlVLIiwicHJvdmExIjo3Ljc1LCJwcm92YTFfcGVzbzgiOjYuMiwicHJvdmEyIjo3LCJwcm92YTJfcGVzbzgiOjUuNiwidGRlIjoxLjgsImVuYWRlIjowLjcsImZpbmFsIjo4LjQsInBvcnRhbF9wcm92YTEiOjgsInBvcnRhbF9wcm92YTIiOjguOCwicG9ydGFsX2ZpbmFsIjo4LjR9LHsicmEiOiI0MzM3MiIsInR1cm1hIjoiVDIiLCJub21lIjoiUkFGQUVMIEdVU1RBVk8gS0FNTUxFUiIsInByb3ZhMSI6OSwicHJvdmExX3Blc284Ijo3LjIsInByb3ZhMiI6OS4yNSwicHJvdmEyX3Blc284Ijo3LjQsInRkZSI6MS44LCJlbmFkZSI6MC43LCJmaW5hbCI6OS44LCJwb3J0YWxfcHJvdmExIjo5LjgsInBvcnRhbF9wcm92YTIiOjkuOCwicG9ydGFsX2ZpbmFsIjo5Ljh9LHsicmEiOiIxMDk5OTAiLCJ0dXJtYSI6IlQyIiwibm9tZSI6IlJVQU4gU0FVR08iLCJwcm92YTEiOjEwLCJwcm92YTFfcGVzbzgiOjgsInByb3ZhMiI6MTAsInByb3ZhMl9wZXNvOCI6OCwidGRlIjoyLCJlbmFkZSI6MC43LCJmaW5hbCI6MTAsInBvcnRhbF9wcm92YTEiOjEwLCJwb3J0YWxfcHJvdmEyIjoxMCwicG9ydGFsX2ZpbmFsIjoxMH0seyJyYSI6Ijk4OTM0IiwidHVybWEiOiJUMiIsIm5vbWUiOiJTQU1VRUwgTUFSVElOSSIsInByb3ZhMSI6MTAsInByb3ZhMV9wZXNvOCI6OCwicHJvdmEyIjo5LCJwcm92YTJfcGVzbzgiOjcuMiwidGRlIjoyLjIsImVuYWRlIjowLjYsImZpbmFsIjoxMCwicG9ydGFsX3Byb3ZhMSI6MTAsInBvcnRhbF9wcm92YTIiOjEwLCJwb3J0YWxfZmluYWwiOjEwfSx7InJhIjoiMTA5MDcyIiwidHVybWEiOiJUMiIsIm5vbWUiOiJUSElBR08gSEVOUklRVUUgTUFSS0VORE9SRiIsInByb3ZhMSI6MTAsInByb3ZhMV9wZXNvOCI6OCwicHJvdmEyIjo5LjI1LCJwcm92YTJfcGVzbzgiOjcuNCwidGRlIjoyLjIsImVuYWRlIjowLjcsImZpbmFsIjoxMCwicG9ydGFsX3Byb3ZhMSI6MTAsInBvcnRhbF9wcm92YTIiOjEwLCJwb3J0YWxfZmluYWwiOjEwfSx7InJhIjoiMTA4NTk5IiwidHVybWEiOiJUMiIsIm5vbWUiOiJZQVNNSU4gTkFTQ0lNRU5UTyBQUklDSE9BIiwicHJvdmExIjo5LjUsInByb3ZhMV9wZXNvOCI6Ny42LCJwcm92YTIiOjkuNzUsInByb3ZhMl9wZXNvOCI6Ny44LCJ0ZGUiOjEuOCwiZW5hZGUiOjAuNywiZmluYWwiOjEwLCJwb3J0YWxfcHJvdmExIjoxMCwicG9ydGFsX3Byb3ZhMiI6MTAsInBvcnRhbF9maW5hbCI6MTB9XQ==";
const ALUNOS_DB = JSON.parse(decodeURIComponent(escape(atob(ENCRYPTED_ALUNOS_DB))));

// SETUP THEME
function setupTheme() {
  const currentTheme = localStorage.getItem("showcase-theme") || localStorage.getItem("theme") || "dark";
  const body = document.body;
  const toggle = document.getElementById("mode-toggle");

  if (toggle) {
    if (currentTheme === "light") {
      body.classList.add("light");
      toggle.textContent = "☀️";
    } else {
      body.classList.remove("light");
      toggle.textContent = "🌙";
    }

    toggle.addEventListener("click", () => {
      if (body.classList.contains("light")) {
        body.classList.remove("light");
        toggle.textContent = "🌙";
        localStorage.setItem("showcase-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.add("light");
        toggle.textContent = "☀️";
        localStorage.setItem("showcase-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const scrollBar = document.getElementById("scroll-bar");
    if (!scrollBar) return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollBar.style.width = scrolled + "%";
  });
}

// LOOKUP FUNCTION
function searchStudent() {
  const raInput = document.getElementById("ra-search-input");
  const resultContainer = document.getElementById("result-container");
  const errorContainer = document.getElementById("error-container");
  
  if (!raInput || !resultContainer || !errorContainer) return;

  // Normalize input to 6 digits by padding with leading zeros
  const raQuery = raInput.value.trim().padStart(6, '0');
  
  // Reset outputs
  resultContainer.classList.remove("visible");
  errorContainer.classList.remove("visible");
  resultContainer.style.display = "none";
  errorContainer.style.display = "none";

  if (!raInput.value.trim()) {
    showError("Por favor, digite um RA.");
    return;
  }

  if (!/^\d+$/.test(raInput.value.trim())) {
    showError("O RA deve conter apenas números.");
    return;
  }

  // Compare both input and db record after padding to 6 digits
  const student = ALUNOS_DB.find(s => s.ra.padStart(6, '0') === raQuery);

  if (!student) {
    showError("Estudante não encontrado. Verifique se o RA está correto.");
    return;
  }

  // Display Student Info (guaranteeing 6-digit display)
  document.getElementById("student-name-val").textContent = student.nome;
  document.getElementById("student-ra-val").textContent = student.ra.padStart(6, '0');
  document.getElementById("student-class-val").textContent = `Turma ${student.turma}`;
  
  // Set class tag style
  const classPill = document.getElementById("student-class-val");
  classPill.className = `class-badge ${student.turma.toLowerCase()}`;

  // Fill Formula Table
  document.getElementById("t-p1").textContent = formatNumber(student.prova1);
  document.getElementById("t-p1-8").textContent = formatNumber(student.prova1_peso8);
  document.getElementById("t-p2").textContent = formatNumber(student.prova2);
  document.getElementById("t-p2-8").textContent = formatNumber(student.prova2_peso8);
  document.getElementById("t-tde").textContent = formatNumber(student.tde);
  document.getElementById("t-enade").textContent = formatNumber(student.enade);
  
  const finalVal = document.getElementById("t-final");
  finalVal.textContent = formatNumber(student.final);
  setGradeColorStyle(finalVal, student.final);

  // Fill Portal Table
  document.getElementById("p-p1").textContent = formatNumber(student.portal_prova1);
  document.getElementById("p-p2").textContent = formatNumber(student.portal_prova2);
  
  const portalFinalVal = document.getElementById("p-final");
  portalFinalVal.textContent = formatNumber(student.portal_final);
  setGradeColorStyle(portalFinalVal, student.portal_final);

  // Fill Formula Explanation Math Steps
  const p1_8 = student.prova1_peso8;
  const p2_8 = student.prova2_peso8;
  const tde = student.tde;
  const enade = student.enade;
  const examAvg = (p1_8 + p2_8) / 2;
  const rawSum = examAvg + tde + enade;

  document.getElementById("calc-step-p1").innerHTML = `Prova 1: <strong>${formatNumber(student.prova1)}</strong> × 0.8 = <strong>${formatNumber(p1_8)}</strong>`;
  document.getElementById("calc-step-p2").innerHTML = `Prova 2: <strong>${formatNumber(student.prova2)}</strong> × 0.8 = <strong>${formatNumber(p2_8)}</strong>`;
  document.getElementById("calc-step-avg").innerHTML = `Média das Provas: (<strong>${formatNumber(p1_8)}</strong> + <strong>${formatNumber(p2_8)}</strong>) / 2 = <strong>${formatNumber(examAvg)}</strong>`;
  document.getElementById("calc-step-sum").innerHTML = `Soma dos Componentes: <strong>${formatNumber(examAvg)}</strong> (Média) + <strong>${formatNumber(tde)}</strong> (TDE) + <strong>${formatNumber(enade)}</strong> (ENADE) = <strong>${formatNumber(rawSum)}</strong>`;
  
  const calcStepFinal = document.getElementById("calc-step-final");
  if (rawSum > 10.0) {
    calcStepFinal.innerHTML = `Nota Final: <strong>${formatNumber(rawSum)}</strong> (Limitado ao teto da nota máxima) = <strong class="approved">${formatNumber(10.0)}</strong>`;
  } else {
    calcStepFinal.innerHTML = `Nota Final: = <strong class="${student.final >= 7.0 ? 'approved' : (student.final >= 5.0 ? 'exam' : 'reproved')}">${formatNumber(student.final)}</strong>`;
  }

  // Set visual status in card and feedback alert box
  const statusBadge = document.getElementById("calc-status-badge");
  const feedbackContainer = document.getElementById("student-feedback-container");

  if (feedbackContainer) {
    feedbackContainer.className = "feedback-alert-box";
    feedbackContainer.style.display = "flex";

    const feedbackIcon = feedbackContainer.querySelector(".feedback-icon");
    const feedbackText = feedbackContainer.querySelector(".feedback-text");

    if (student.final >= 7.0) {
      statusBadge.textContent = "Aprovado";
      statusBadge.className = "status-badge approved";
      
      feedbackContainer.classList.add("approved");
      feedbackIcon.textContent = "🎉";
      feedbackText.innerHTML = "Parabéns, você foi aprovado!";
    } else if (student.final >= 5.0) {
      statusBadge.textContent = "Exame";
      statusBadge.className = "status-badge exam";
      
      feedbackContainer.classList.add("exam");
      feedbackIcon.textContent = "📅";
      if (student.turma === "T2") {
        feedbackText.innerHTML = "Atenção: O exame será realizado na terça-feira, dia 7 de Julho de 2026.";
      } else {
        feedbackText.innerHTML = "Atenção: O exame será realizado na quarta-feira, dia 8 de Julho de 2026.";
      }
    } else {
      statusBadge.textContent = "Reprovado";
      statusBadge.className = "status-badge reproved";
      
      feedbackContainer.classList.add("reproved");
      feedbackIcon.textContent = "❌";
      feedbackText.innerHTML = "Não passou na matéria.";
    }
  }

  // Explain Portal URI Distribution
  const portalExplanation = document.getElementById("portal-distribution-text");
  // Prova 1 Portal = P1 (10) + (TDE/2) + ENADE/0.8? Or whatever delta is.
  // Actually, we can show:
  // Portal Prova 1: (Prova 1 Peso 8 + TDE/2 + ENADE) / 0.8
  // Or we can just highlight that:
  // "No Portal da URI, as notas das avaliações contínuas (TDE e ENADE) são incorporadas diretamente nas notas das Provas 1 e 2.
  // A média final calculada pelo Portal (Média Simples) resulta exatamente no mesmo valor final da nossa fórmula presencial."
  
  // Show results
  resultContainer.style.display = "block";
  setTimeout(() => {
    resultContainer.classList.add("visible");
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 10);
}

function formatNumber(num) {
  return num.toFixed(2).replace(".", ",");
}

function setGradeColorStyle(element, grade) {
  if (grade >= 7.0) {
    element.className = "grade-val approved";
  } else if (grade >= 5.0) {
    element.className = "grade-val exam";
  } else {
    element.className = "grade-val reproved";
  }
}

function showError(msg) {
  const errorContainer = document.getElementById("error-container");
  if (!errorContainer) return;
  
  errorContainer.textContent = msg;
  errorContainer.style.display = "block";
  setTimeout(() => {
    errorContainer.classList.add("visible");
  }, 10);
}

// SETUP LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();

  const raInput = document.getElementById("ra-search-input");
  const searchBtn = document.getElementById("btn-search-ra");

  if (raInput) {
    raInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchStudent();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      searchStudent();
    });
  }
});
