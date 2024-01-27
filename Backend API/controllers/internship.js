const express = require("express");
const Internship = require("../models/internship");
const mongoose = require("mongoose");

const createInternship = async (req, res) => {
  try {
    const { title, description, company, season } = req.body;
    const newInternship = new Internship({
      title,
      description,
      company,
      season,
    });

    await newInternship.save();

    res.status(201).json({
      message: "Internship created successfully",
      internship: newInternship,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internship creation failed", details: error.message });
  }
};

const getPopularInternships = async (req, res) => {
  try {
    const popularInternships = await Internship.find().limit(5);

    res.json({ popularInternships });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get nearest internships
const getNearestInternships = async (req, res) => {
  try {
    const nearestInternships = await Internship.find();

    res.json({ nearestInternships });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get all internships
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json({ internships });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching internships", details: error.message });
  }
};

// Function to get a specific internship by ID
const getInternship = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such internship" });
  }
  const internship = await Internship.findById(id);

  if (!internship) {
    return res.status(401).json({ message: "Internship not found" });
  }
  res.status(200).json(internship);
};

module.exports = {
  createInternship,
  getInternships,
  getInternship,
  getPopularInternships,
  getNearestInternships,
};
