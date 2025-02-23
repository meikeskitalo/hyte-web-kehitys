# Web dev tuntiesimerkit

Authentication:
# updated entry is searched with both token user id and url parameter id
PUT /api/entries/:id - only entry owner can update entry

# deleted entry is searched with both token user id and url parameter id
DELETE /api/entries/:id - only entry owner can delete entry

# user is updated based on user id in the token
PUT /api/users/ - users can update only their own user info
