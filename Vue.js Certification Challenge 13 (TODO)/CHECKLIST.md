- You've tested all the following conditions concerning the useRefHistory composable. It:
- stores the history of the source value
- does NOT include the current value in history
- stores the history ordered from newest to oldest
- removes the oldest record(s) when the history reaches the capacity
- allows capacity as a getter (callback function) and dynamically update history when capacity changes
- allows capacity as a ref and dynamically update history when capacity changes
- sets the data source back to the previous value on undo
- sets the data source to one record forward in history on redo
