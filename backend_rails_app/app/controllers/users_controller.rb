class UsersController < ApplicationController

	def sign_up 
		user = User.new(user_params)
		if user.save
			render json:{user:user,message:"user data saved successfully"}
		else
			render json:{errors:errors.full_messages},status: :unprocessable_entity
		end 
	end 

	private 

	def user_params
		params.permit(:email,:password,:password_confirmation)
	end 


end
