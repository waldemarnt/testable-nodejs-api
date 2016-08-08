import express from "express";
import app from './app';

app.listen(app.get('port'), () => {
  console.log(`app running on ${app.get('port')}`);
});
