# == Schema Information
#
# Table name: reviewable_projects
#
#  id             :bigint           not null, primary key
#  storage_app_id :integer          not null
#  user_id        :integer          not null
#  level_id       :integer
#  script_id      :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_reviewable_projects_on_user_script_level_storage_app  (user_id,script_id,level_id,storage_app_id)
#
class ReviewableProject < ApplicationRecord
  belongs_to :user
  belongs_to :level
  belongs_to :script

  def self.user_can_mark_project_reviewable?(project_owner, user)
    project_owner == user && project_owner.sections_as_student.all?(&:code_review_enabled?)
  end

  def peer_reviewers
    sections = user.sections_as_student
    script_course_ids = script.unit_groups.pluck(:id)
    filtered_sections = sections.where(script_id: script_id).or(sections.where(course_id: script_course_ids))
    followers = filtered_sections.
      map(&:followers).
      flatten.
      pluck(:student_user_id)
    return followers.select {|student_user_id| user_id != student_user_id}
  end
end
