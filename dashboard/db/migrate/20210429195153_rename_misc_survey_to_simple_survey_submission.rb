class RenameMiscSurveyToSimpleSurveySubmission < ActiveRecord::Migration[5.2]
  def change
    rename_table :foorm_misc_surveys, :foorm_simple_survey_submissions
  end
end
